using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class Crop
{
    public int CropId { get; set; }

    public string CropName { get; set; } = null!;

    public int CategoryId { get; set; }

    public int Rate { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<CropRateHistory> CropRateHistories { get; set; } = new List<CropRateHistory>();

    public virtual ICollection<Farmer> Farmers { get; set; } = new List<Farmer>();
}
