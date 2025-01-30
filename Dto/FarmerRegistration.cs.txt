namespace FarmerBackend.Dto
{
    public class FarmerRegistration
    {
       

        public string FirstName { get; set; } 

        public string LastName { get; set; } 

        public string ContactNo { get; set; } 

        public string Email {  get; set; }

        public DateOnly Dob { get; set; }

        public string Password {  get; set; }
      
    }
}
