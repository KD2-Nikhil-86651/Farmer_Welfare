using FarmerBackend.Dto;
using FarmerBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FarmerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopkeeperController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApmcdbContext _context;

        public ShopkeeperController(IConfiguration configuration)
        {
            _configuration = configuration;
            _context = new ApmcdbContext();
        }

        // ✅ Get All Shopkeepers - Requires Authentication
        [Authorize]
        [HttpGet]
        public IActionResult GetShopkeepers()
        {
            var userIdentity = HttpContext.User.Identity as ClaimsIdentity;

            if (userIdentity == null || !userIdentity.IsAuthenticated)
            {
                return Unauthorized(new { message = "Unauthorized access!" });
            }

            var shopkeepers = _context.Shopkeepers.ToList();
            return Ok(shopkeepers);
        }

        // ✅ Get Shopkeeper by ID - Requires Authentication
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetShopkeeper(int id)
        {
            var shopkeeper = _context.Shopkeepers.Find(id);
            if (shopkeeper == null)
            {
                return NotFound(new { message = "Shopkeeper not found" });
            }
            return Ok(shopkeeper);
        }

        // ✅ Shopkeeper Registration
        [HttpPost("Registration")]
        public IActionResult Register([FromBody] ShopkeeperRegistration shopkeeperRegistration)
        {
            try
            {
                Shopkeeper shopkeeper = new Shopkeeper
                {
                    FirstName = shopkeeperRegistration.FirstName,
                    LastName = shopkeeperRegistration.LastName,
                    ContactNo = shopkeeperRegistration.ContactNo,
                    Email = shopkeeperRegistration.Email,
                    LicenseNo = shopkeeperRegistration.LicenseNo,
                    Password = shopkeeperRegistration.Password, // Ideally, hash the password
                    CategoryId = 1, // Default Category
                    Quantity = 0,
                    Rate = 0
                };

                _context.Shopkeepers.Add(shopkeeper);
                _context.SaveChanges();

                return Ok(new { status = "success", message = "Shopkeeper registered successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", error = ex.Message });
            }
        }

        // ✅ Shopkeeper Login - Returns JWT Token
        [HttpPost("Login")]
        public IActionResult Login([FromBody] ShopkeeperLogin shopkeeperLogin)
        {
            var shopkeeper = _context.Shopkeepers.FirstOrDefault(e =>
                e.ContactNo == shopkeeperLogin.ContactNo && e.Password == shopkeeperLogin.Password);

            if (shopkeeper == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, shopkeeper.ContactNo),
                    new Claim("ShopkeeperID", shopkeeper.ShopkeeperId.ToString()) // Custom claim
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string jwtToken = tokenHandler.WriteToken(token);

            return Ok(new { Token = jwtToken, Message = "Login successful" });
        }

        // ✅ Update Shopkeeper - Requires Authentication
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateShopkeeper(int id, [FromBody] ShopkeeperUpdate shopkeeperUpdate)
        {
            var shopkeeper = _context.Shopkeepers.Find(id);
            if (shopkeeper == null)
            {
                return NotFound(new { message = "Shopkeeper not found" });
            }

            shopkeeper.FirstName = shopkeeperUpdate.Fname;
            shopkeeper.LastName = shopkeeperUpdate.Lname;
            shopkeeper.Password = shopkeeperUpdate.Password; // Ideally, store a **hashed** password
            _context.SaveChanges();

            return Ok(new { status = "success", message = "Shopkeeper details updated successfully" });
        }
    }
}

