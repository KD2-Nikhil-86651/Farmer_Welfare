using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class Admin
{
    public int AdminId { get; set; }

    public string ContactNo { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime? Timestamp { get; set; }
}
