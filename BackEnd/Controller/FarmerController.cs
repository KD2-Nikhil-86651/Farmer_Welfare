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
    public class FarmerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApmcdbContext _context;

        public FarmerController(IConfiguration configuration)
        {
            _configuration = configuration;
            _context = new ApmcdbContext();
        }

        // ✅ Get All Farmers - Requires Authentication
        //[Authorize]
        //[HttpGet]
        //public IActionResult GetFarmers()
        //{
        //    var farmers = _context.Farmers.ToList();
        //    return Ok(farmers);
        //}

        [Authorize]
        [HttpGet]
        public IActionResult GetFarmers()
        {
            var userIdentity = HttpContext.User.Identity as ClaimsIdentity;

            if (userIdentity == null || !userIdentity.IsAuthenticated)
            {
                return Unauthorized(new { message = "Unauthorized access!" });
            }

            var farmers = _context.Farmers.ToList();
            return Ok(farmers);
        }


        // ✅ Get Farmer by ID - Requires Authentication
        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetFarmer(int id)
        {
            var farmer = _context.Farmers.Find(id);
            if (farmer == null)
            {
                return NotFound(new { message = "Farmer not found" });
            }
            return Ok(farmer);
        }

        // ✅ Farmer Registration
        [HttpPost("Registration")]
        public IActionResult Register([FromBody] FarmerRegistration farmerRegistration)
        {
            try
            {
                Farmer farmer = new Farmer
                {
                    FirstName = farmerRegistration.FirstName,
                    LastName = farmerRegistration.LastName,
                    ContactNo = farmerRegistration.ContactNo,
                    Email = farmerRegistration.Email,
                    Dob = farmerRegistration.Dob,
                    Password = farmerRegistration.Password // Ideally, hash the password
                };

                _context.Farmers.Add(farmer);
                _context.SaveChanges();

                return Ok(new { status = "success", message = "Farmer registered successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", error = ex.Message });
            }
        }

        // ✅ Farmer Login - Returns JWT Token
        [HttpPost("Login")]
        public IActionResult Login([FromBody] FarmerLogin farmerLogin)
        {
            var farmer = _context.Farmers.FirstOrDefault(e =>
                e.ContactNo == farmerLogin.ContactNo && e.Password == farmerLogin.Password);

            if (farmer == null)
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
                    new Claim(ClaimTypes.Name, farmer.ContactNo),
                    new Claim("FarmerID", farmer.FarmerId.ToString()) // Custom claim
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

        // ✅ Update Farmer - Requires Authentication
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateFarmer(int id, [FromBody] FarmerUpdate farmerUpdate)
        {
            var farmer = _context.Farmers.Find(id);
            if (farmer == null)
            {
                return NotFound(new { message = "Farmer not found" });
            }

            farmer.FirstName = farmerUpdate.Fname;
            farmer.LastName = farmerUpdate.Lname;
            farmer.Password = farmerUpdate.Password; // Ideally, store a **hashed** password
            _context.SaveChanges();

            return Ok(new { status = "success", message = "Farmer details updated successfully" });
        }
    }
}
