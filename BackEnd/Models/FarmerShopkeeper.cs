using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class FarmerShopkeeper
{
    public int FarmerShopkeeperId { get; set; }

    public int FarmerId { get; set; }

    public int ShopkeeperId { get; set; }

    public DateTime? Timestamp { get; set; }

    public virtual Farmer Farmer { get; set; } = null!;

    public virtual Shopkeeper Shopkeeper { get; set; } = null!;
}
