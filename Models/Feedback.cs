using System;
using System.Collections.Generic;

namespace FarmerBackend.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public string Feedback1 { get; set; } = null!;
}
