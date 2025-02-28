using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class Shopkeeper
{
    public int ShopkeeperId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string ContactNo { get; set; } = null!;

    public string LicenseNo { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int Quantity { get; set; }

    public int Rate { get; set; }

    public int CategoryId { get; set; }

    public int? BuyerId { get; set; }

    public string Email { get; set; } = null!;

    public DateTime? Timestamp { get; set; }

    public virtual Buyer? Buyer { get; set; }

    public virtual ICollection<Buyer> Buyers { get; set; } = new List<Buyer>();

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<FarmerShopkeeper> FarmerShopkeepers { get; set; } = new List<FarmerShopkeeper>();

    public virtual ICollection<Farmer> Farmers { get; set; } = new List<Farmer>();
}
