using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FarmerBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FarmerBackend.Dto;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FarmerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropsController : ControllerBase
    {
        private readonly ApmcdbContext _context;

        public CropsController(ApmcdbContext context)
        {
            _context = context;
        }

        // ✅ GET ALL CROPS
        [HttpGet]
        public async Task<IActionResult> GetCrops()
        {
            try
            {
                var crops = await _context.Crops.AsNoTracking().ToListAsync();
                if (!crops.Any())
                {
                    return NotFound(new { message = "No crops found" });
                }
                return Ok(new { message = "Crops retrieved successfully", data = crops });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }

        // ✅ UPDATE CROP RATE (Only Admin)
        [HttpPost("update-rate")]
        public async Task<IActionResult> UpdateCropRate([FromBody] UpdateCropRateRequest request)
        {
            if (request.NewRate <= 0)
            {
                return BadRequest(new { message = "Rate must be greater than 0" });
            }

            try
            {
                var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized(new { message = "Token is missing!" });
                }

                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadToken(token) as JwtSecurityToken;
                if (jwtToken == null)
                {
                    return Unauthorized(new { message = "Invalid token!" });
                }

                var contactNumber = jwtToken.Claims.FirstOrDefault(c => c.Type == "ContactNo")?.Value;
                var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "UserID")?.Value;

                if (string.IsNullOrEmpty(contactNumber) || string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid token data!" });
                }

                // 🔹 Check Role Manually
                var isAdmin = _context.Admins.Any(a => a.ContactNo == contactNumber);
                if (!isAdmin)
                {
                    return Forbid("You are not authorized to update crop rates.");
                }

                var crop = await _context.Crops.FindAsync(request.CropId);
                if (crop == null)
                {
                    return NotFound(new { message = "Crop not found" });
                }

                var history = new CropRateHistory
                {
                    CropId = request.CropId,
                    Rate = crop.Rate,
                    RateDate = DateTime.UtcNow.Date,
                    UpdatedBy = contactNumber,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.CropRateHistories.Add(history);

                crop.Rate = request.NewRate;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Crop rate updated successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }

        // ✅ GET CROP RATE HISTORY
        [HttpGet("rate-history/{cropId}")]
        public async Task<IActionResult> GetCropRateHistory(int cropId)
        {
            try
            {
                var history = await _context.CropRateHistories
                    .Where(h => h.CropId == cropId)
                    .OrderByDescending(h => h.RateDate)
                    .ToListAsync();

                if (!history.Any())
                {
                    return NotFound(new { message = "No rate history found for this crop" });
                }

                return Ok(new { message = "Rate history retrieved successfully", data = history });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred", error = ex.Message });
            }
        }
    }
}



