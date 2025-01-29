using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class Buyer
{
    public int BuyerId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string ContactNo { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? ShopkeeperId { get; set; }

    public int Quantity { get; set; }

    public int Rate { get; set; }

    public string Email { get; set; } = null!;

    public DateTime? Timestamp { get; set; }

    public virtual Shopkeeper? Shopkeeper { get; set; }

    public virtual ICollection<Shopkeeper> Shopkeepers { get; set; } = new List<Shopkeeper>();
}
