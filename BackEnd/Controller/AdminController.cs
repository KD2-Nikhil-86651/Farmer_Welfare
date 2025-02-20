using FarmerBackend.Dto;
using FarmerBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FarmerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApmcdbContext _context;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
            _context = new ApmcdbContext();
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] AdminLogin adminLogin)
        {
            var admin = _context.Admins.FirstOrDefault(a =>
                a.ContactNo == adminLogin.Contact_NO &&
                a.Password == adminLogin.Password);

            if (admin == null)
            {
                return Unauthorized(new { Message = "Invalid credentials" });
            }

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, admin.ContactNo),
                    new Claim("AdminID", admin.AdminId.ToString()) // Custom claim
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

        [HttpGet]
        public IActionResult GetAdmins()
        {
            var admins = _context.Admins.ToList();
            return Ok(admins);
        }
    }
}
