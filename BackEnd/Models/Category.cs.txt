using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public virtual ICollection<Crop> Crops { get; set; } = new List<Crop>();

    public virtual ICollection<Farmer> Farmers { get; set; } = new List<Farmer>();

    public virtual ICollection<Shopkeeper> Shopkeepers { get; set; } = new List<Shopkeeper>();
}
