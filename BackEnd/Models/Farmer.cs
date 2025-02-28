using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class Farmer
{
    public int FarmerId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string ContactNo { get; set; } = null!;

    public DateOnly Dob { get; set; }

    public string Password { get; set; } = null!;

    public int? CropId { get; set; }

    public int? CategoryId { get; set; }

    public int? ShopkeeperId { get; set; }

    public string Email { get; set; } = null!;

    public DateTime? Timestamp { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Crop? Crop { get; set; }

    public virtual ICollection<FarmerShopkeeper> FarmerShopkeepers { get; set; } = new List<FarmerShopkeeper>();

    public virtual Shopkeeper? Shopkeeper { get; set; }
}
