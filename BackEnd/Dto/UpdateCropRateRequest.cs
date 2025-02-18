using System.ComponentModel.DataAnnotations;

namespace FarmerBackend.Dto
{
    public class UpdateCropRateRequest
    {

        //public int CropId { get; set; }
        //public int NewRate { get; set; }
        //public string AdminUser { get; set; }
        public int CropId { get; set; }

        [Required(ErrorMessage = "New rate is required.")]
        public int NewRate { get; set; }

        [Required(ErrorMessage = "Contact number is required.")]
        public string ContactNo { get; set; } = string.Empty;

        [Required(ErrorMessage = "Role is required.")]
        public string Role { get; set; } = string.Empty;
    }
}
