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
    public class BuyerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApmcdbContext _context;

        public BuyerController(IConfiguration configuration)
        {
            _configuration = configuration;
            _context = new ApmcdbContext();
        }

        // Get All Buyers - Requires Authentication
        [Authorize]
        [HttpGet]
        public IActionResult GetBuyers()
        {
            var buyers = _context.Buyers.ToList();
            return Ok(buyers);
        }

        // Get Buyer by ID - Requires Authentication
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetBuyer(int id)
        {
            var buyer = _context.Buyers.Find(id);
            if (buyer == null)
            {
                return NotFound(new { message = "Buyer not found" });
            }
            return Ok(buyer);
        }

        // Register New Buyer
        [HttpPost("Registration")]
        public IActionResult Register([FromBody] BuyerRegistration buyerRegistration)
        {
            try
            {
                Buyer buyer = new Buyer
                {
                    FirstName = buyerRegistration.FirstName,
                    LastName = buyerRegistration.LastName,
                    ContactNo = buyerRegistration.ContactNo,
                    Email = buyerRegistration.Email,
                    Password = buyerRegistration.Password // Ideally, store a **hashed** password
                };

                _context.Buyers.Add(buyer);
                _context.SaveChanges();

                return Ok(new { status = "success", message = "Buyer registered successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", error = ex.Message });
            }
        }

        // Login - Returns JWT Token
        [HttpPost("Login")]
        public IActionResult Login([FromBody] BuyerLogin buyerLogin)
        {
            var buyer = _context.Buyers.FirstOrDefault(e => e.ContactNo == buyerLogin.ContactNo && e.Password == buyerLogin.Password);

            if (buyer == null)
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
                    new Claim(ClaimTypes.Name, buyer.ContactNo),
                    new Claim("BuyerID", buyer.BuyerId.ToString()) // Custom claim
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _configuration["Jwt:Issuer"],  // FarmerBackend
                Audience = _configuration["Jwt:Audience"], // FarmerFrontend
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string jwtToken = tokenHandler.WriteToken(token);

            return Ok(new { Token = jwtToken, Message = "Login successful" });
        }

        // Update Buyer - Requires Authentication
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateBuyer(int id, [FromBody] BuyerUpdate buyerUpdate)
        {
            var buyer = _context.Buyers.Find(id);
            if (buyer == null)
            {
                return NotFound(new { message = "Buyer not found" });
            }

            buyer.FirstName = buyerUpdate.Fname;
            buyer.LastName = buyerUpdate.Lname;
            buyer.Password = buyerUpdate.Password; // Ideally, store a **hashed** password
            _context.SaveChanges();

            return Ok(new { status = "success", message = "Buyer details updated successfully" });
        }
    }
}
