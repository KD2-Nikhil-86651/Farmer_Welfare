using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class CropRateHistory
{
    public int HistoryId { get; set; }

    public int CropId { get; set; }

    public int Rate { get; set; }

    public DateTime? RateDate { get; set; } // ✅ Changed from DateOnly? to DateTime?

    public string UpdatedBy { get; set; } = null!;

    public DateTime? UpdatedAt { get; set; }

    public virtual Crop Crop { get; set; } = null!;
}
