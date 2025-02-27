using Microsoft.AspNetCore.Mvc;
using FarmerBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FarmerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly ApmcdbContext _context;

        public FeedbackController(ApmcdbContext context)
        {
            _context = context;
        }

        // POST: api/Feedback (Submit Feedback)
        [HttpPost]
        public async Task<IActionResult> PostFeedback([FromBody] Feedback feedback)
        {
            if (feedback == null || string.IsNullOrWhiteSpace(feedback.Feedback1))
            {
                return BadRequest(new { message = "Feedback cannot be empty!" });
            }

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback submitted successfully!" });
        }

        // GET: api/Feedback (Retrieve All Feedback)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedback()
        {
            var feedbackList = await _context.Feedbacks.ToListAsync();
            return Ok(feedbackList);
        }


        // DELETE: api/Feedback/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null)
            {
                return NotFound(new { message = "Feedback not found!" });
            }

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback deleted successfully!" });
        }

    }
}


//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using FarmerBackend.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using FarmerBackend.Dto;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;

//namespace FarmerBackend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class FeedbackController : ControllerBase
//    {
//        private readonly ApmcdbContext _context;
//        private readonly IConfiguration _configuration;

//        public FeedbackController(ApmcdbContext context, IConfiguration configuration)
//        {
//            _context = context;
//            _configuration = configuration;
//        }

//        // ✅ GET ALL FEEDBACK
//        [HttpGet]
//        public async Task<IActionResult> GetAllFeedback()
//        {
//            var feedbackList = await _context.Feedbacks.ToListAsync();
//            return Ok(feedbackList);
//        }

//        // ✅ SUBMIT FEEDBACK
//        [HttpPost]
//        public async Task<IActionResult> PostFeedback([FromBody] Feedback feedback)
//        {
//            if (feedback == null || string.IsNullOrWhiteSpace(feedback.Feedback1))
//            {
//                return BadRequest(new { message = "Feedback cannot be empty!" });
//            }

//            _context.Feedbacks.Add(feedback);
//            await _context.SaveChangesAsync();

//            return Ok(new { message = "Feedback submitted successfully!" });
//        }

//        // ✅ DELETE FEEDBACK (Only Admin)
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteFeedback(int id)
//        {
//            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
//            if (string.IsNullOrEmpty(token))
//            {
//                return Unauthorized(new { message = "Token is missing!" });
//            }

//            var handler = new JwtSecurityTokenHandler();
//            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
//            var validations = new TokenValidationParameters
//            {
//                ValidateIssuerSigningKey = true,
//                IssuerSigningKey = new SymmetricSecurityKey(key),
//                ValidateIssuer = false,
//                ValidateAudience = false,
//                ClockSkew = TimeSpan.Zero
//            };

//            try
//            {
//                var claimsPrincipal = handler.ValidateToken(token, validations, out var validatedToken);
//                var contactNumber = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "ContactNo")?.Value;
//                var password = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "Password")?.Value;

//                if (string.IsNullOrEmpty(contactNumber) || string.IsNullOrEmpty(password))
//                {
//                    return Unauthorized(new { message = "Invalid token data!" });
//                }

//                var isAdmin = _context.Admins.Any(a => a.ContactNo == contactNumber && a.Password == password);
//                if (!isAdmin)
//                {
//                    return Forbid("You are not authorized to delete feedback.");
//                }

//                var feedback = await _context.Feedbacks.FindAsync(id);
//                if (feedback == null)
//                {
//                    return NotFound(new { message = "Feedback not found!" });
//                }

//                _context.Feedbacks.Remove(feedback);
//                await _context.SaveChangesAsync();

//                return Ok(new { message = "Feedback deleted successfully!" });
//            }
//            catch (Exception ex)
//            {
//                return Unauthorized(new { message = "Invalid token!", error = ex.Message });
//            }
//        }
//    }
//}



