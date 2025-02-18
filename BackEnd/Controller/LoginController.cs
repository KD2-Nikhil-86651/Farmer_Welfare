//using FarmerBackend.Dto;
//using FarmerBackend.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace FarmerBackend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly ApmcdbContext _context;

//        public AuthController(IConfiguration configuration)
//        {
//            _configuration = configuration;
//            _context = new ApmcdbContext();
//        }

//        [HttpPost("Login")]
//        public IActionResult Login([FromBody] LoginRequest loginRequest)
//        {
//            // Variables to store user information
//            string role = "";
//            int userId = 0;
//            string firstName = "";
//            string lastName = "";
//            string contactNo = "";
//            string email = "";

//            // ✅ Check in Admin table
//            var admin = _context.Admins.FirstOrDefault(a => a.ContactNo == loginRequest.ContactNo && a.Password == loginRequest.Password);
//            if (admin != null)
//            {
//                role = "Admin";
//                userId = admin.AdminId;
//                contactNo = admin.ContactNo;
//                email = admin.Email;
//                firstName = "Admin"; // No first name field in Admin
//                lastName = "";
//            }

//            // ✅ Check in Farmer table (Only if user not found yet)
//            else
//            {
//                var farmer = _context.Farmers.FirstOrDefault(f => f.ContactNo == loginRequest.ContactNo && f.Password == loginRequest.Password);
//                if (farmer != null)
//                {
//                    role = "Farmer";
//                    userId = farmer.FarmerId;
//                    firstName = farmer.FirstName;
//                    lastName = farmer.LastName;
//                    contactNo = farmer.ContactNo;
//                    email = farmer.Email;
//                }
//            }

//            // ✅ Check in Shopkeeper table (Only if user not found yet)
//            if (role == "")
//            {
//                var shopkeeper = _context.Shopkeepers.FirstOrDefault(s => s.ContactNo == loginRequest.ContactNo && s.Password == loginRequest.Password);
//                if (shopkeeper != null)
//                {
//                    role = "Shopkeeper";
//                    userId = shopkeeper.ShopkeeperId;
//                    firstName = shopkeeper.FirstName;
//                    lastName = shopkeeper.LastName;
//                    contactNo = shopkeeper.ContactNo;
//                    email = shopkeeper.Email;
//                }
//            }

//            // ✅ Check in Buyer table (Only if user not found yet)
//            if (role == "")
//            {
//                var buyer = _context.Buyers.FirstOrDefault(b => b.ContactNo == loginRequest.ContactNo && b.Password == loginRequest.Password);
//                if (buyer != null)
//                {
//                    role = "Buyer";
//                    userId = buyer.BuyerId;
//                    firstName = buyer.FirstName;
//                    lastName = buyer.LastName;
//                    contactNo = buyer.ContactNo;
//                    email = buyer.Email;
//                }
//            }

//            // If user is not found, return Unauthorized
//            if (role == "")
//            {
//                return Unauthorized(new { message = "Invalid credentials" });
//            }

//            Console.WriteLine("=================================");
//            Console.WriteLine("✅ User Logged In:");
//            Console.WriteLine($"UserID    : {userId}");
//            Console.WriteLine($"FirstName : {firstName}");
//            Console.WriteLine($"LastName  : {lastName}");
//            Console.WriteLine($"ContactNo : {contactNo}");
//            Console.WriteLine($"Email     : {email}");
//            Console.WriteLine($"Role      : {role}");
//            Console.WriteLine("=================================");
//            // ✅ Generate JWT Token
//            string jwtToken = GenerateJwtToken(userId, firstName, lastName, contactNo, email, role);

//            // ✅ Return user details and token
//            return Ok(new
//            {
//                Token = jwtToken,
//                User = new
//                {
//                    UserID = userId,
//                    FirstName = firstName,
//                    LastName = lastName,
//                    ContactNo = contactNo,
//                    Email = email,
//                    Role = role
//                },
//                Message = "Login successfully"
//            });
//        }

//        /// <summary>
//        /// Generates a JWT Token for the authenticated user
//        /// </summary>
//        private string GenerateJwtToken(int userId, string firstName, string lastName, string contactNo, string email, string role)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(new[]
//                {
//                    new Claim(ClaimTypes.Name, contactNo),
//                    new Claim("UserID", userId.ToString()),
//                    new Claim(ClaimTypes.Role, role),
//                    new Claim("FirstName", firstName),
//                    new Claim("LastName", lastName),
//                    new Claim(ClaimTypes.Email, email),
//                    new Claim("ContactNo", contactNo)
//                }),
//                Expires = DateTime.UtcNow.AddHours(2),
//                Issuer = _configuration["Jwt:Issuer"],
//                Audience = _configuration["Jwt:Audience"],
//                SigningCredentials = new SigningCredentials(
//                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };

//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return tokenHandler.WriteToken(token);
//        }
//    }

//    public class LoginRequest
//    {
//        public string ContactNo { get; set; }
//        public string Password { get; set; }
//    }
//}
//************************************************************************************

//using FarmerBackend.Dto;
//using FarmerBackend.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace FarmerBackend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly ApmcdbContext _context;

//        public AuthController(IConfiguration configuration, ApmcdbContext context)
//        {
//            _configuration = configuration;
//            _context = context;
//        }

//        [HttpPost("Login")]
//        public IActionResult Login([FromBody] LoginRequest loginRequest)
//        {
//            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.ContactNo) || string.IsNullOrEmpty(loginRequest.Password))
//            {
//                return BadRequest(new { message = "Contact number and password are required" });
//            }

//            // ✅ Initialize variables
//            string role = "";
//            int userId = 0;
//            string firstName = "";
//            string lastName = "";
//            string contactNo = "";
//            string email = "";

//            // ✅ Check in Admin table
//            var admin = _context.Admins.FirstOrDefault(a => a.ContactNo == loginRequest.ContactNo && a.Password == loginRequest.Password);
//            if (admin != null)
//            {
//                role = "Admin";
//                userId = admin.AdminId;
//                contactNo = admin.ContactNo;
//                email = admin.Email;
//                firstName = "Admin";
//                lastName = "";
//            }
//            else
//            {
//                // ✅ Check other user tables
//                var farmer = _context.Farmers.FirstOrDefault(f => f.ContactNo == loginRequest.ContactNo && f.Password == loginRequest.Password);
//                if (farmer != null)
//                {
//                    role = "Farmer";
//                    userId = farmer.FarmerId;
//                    firstName = farmer.FirstName;
//                    lastName = farmer.LastName;
//                    contactNo = farmer.ContactNo;
//                    email = farmer.Email;
//                }
//                else
//                {
//                    var shopkeeper = _context.Shopkeepers.FirstOrDefault(s => s.ContactNo == loginRequest.ContactNo && s.Password == loginRequest.Password);
//                    if (shopkeeper != null)
//                    {
//                        role = "Shopkeeper";
//                        userId = shopkeeper.ShopkeeperId;
//                        firstName = shopkeeper.FirstName;
//                        lastName = shopkeeper.LastName;
//                        contactNo = shopkeeper.ContactNo;
//                        email = shopkeeper.Email;
//                    }
//                    else
//                    {
//                        var buyer = _context.Buyers.FirstOrDefault(b => b.ContactNo == loginRequest.ContactNo && b.Password == loginRequest.Password);
//                        if (buyer != null)
//                        {
//                            role = "Buyer";
//                            userId = buyer.BuyerId;
//                            firstName = buyer.FirstName;
//                            lastName = buyer.LastName;
//                            contactNo = buyer.ContactNo;
//                            email = buyer.Email;
//                        }
//                    }
//                }
//            }

//            // ✅ If no user was found
//            if (string.IsNullOrEmpty(role))
//            {
//                return Unauthorized(new { message = "Invalid credentials" });
//            }

//            // ✅ Generate JWT Token
//            string jwtToken = GenerateJwtToken(userId, firstName, lastName, contactNo, email, role);

//            // ✅ Return user details and token
//            return Ok(new
//            {
//                Token = jwtToken,
//                User = new
//                {
//                    UserID = userId,
//                    FirstName = firstName,
//                    LastName = lastName,
//                    ContactNo = contactNo,
//                    Email = email,
//                    Role = role
//                },
//                Message = "Login successful"
//            });
//        }

//        /// <summary>
//        /// Generates a JWT Token for the authenticated user
//        /// </summary>
//        private string GenerateJwtToken(int userId, string firstName, string lastName, string contactNo, string email, string role)
//        {
//            try
//            {
//                var tokenHandler = new JwtSecurityTokenHandler();
//                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

//                var tokenDescriptor = new SecurityTokenDescriptor
//                {
//                    Subject = new ClaimsIdentity(new[]
//                    {
//                        new Claim(ClaimTypes.Name, contactNo),
//                        new Claim("UserID", userId.ToString()),
//                        new Claim(ClaimTypes.Role, role),
//                        new Claim("FirstName", firstName),
//                        new Claim("LastName", lastName),
//                        new Claim(ClaimTypes.Email, email),
//                        new Claim("ContactNo", contactNo)
//                    }),
//                    Expires = DateTime.UtcNow.AddHours(2),
//                    Issuer = _configuration["Jwt:Issuer"],
//                    Audience = _configuration["Jwt:Audience"],
//                    SigningCredentials = new SigningCredentials(
//                        new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//                };

//                var token = tokenHandler.CreateToken(tokenDescriptor);
//                return tokenHandler.WriteToken(token);
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Error generating token", ex);
//            }
//        }
//    }

//    public class LoginRequest
//    {
//        public string ContactNo { get; set; }
//        public string Password { get; set; }
//    }
//}

//using FarmerBackend.Dto;
//using FarmerBackend.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace FarmerBackend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly ApmcdbContext _context;

//        public AuthController(IConfiguration configuration, ApmcdbContext context)
//        {
//            _configuration = configuration;
//            _context = context;
//        }

//        [HttpPost("Login")]
//        public IActionResult Login([FromBody] LoginRequest loginRequest)
//        {
//            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.ContactNo) || string.IsNullOrEmpty(loginRequest.Password))
//            {
//                return BadRequest(new { message = "Contact number and password are required" });
//            }

//            var user = GetUserByContactNoAndPassword(loginRequest.ContactNo, loginRequest.Password);
//            if (user == null)
//            {
//                return Unauthorized(new { message = "Invalid credentials" });
//            }

//            string jwtToken = GenerateJwtToken(user.UserID, user.FirstName, user.LastName, user.ContactNo, user.Email, user.Role);

//            return Ok(new
//            {
//                Token = jwtToken,
//                User = user,
//                Message = "Login successful"
//            });
//        }

//        private dynamic GetUserByContactNoAndPassword(string contactNo, string password)
//        {
//            var admin = _context.Admins.FirstOrDefault(a => a.ContactNo == contactNo && a.Password == password);
//            if (admin != null)
//            {
//                return new { UserID = admin.AdminId, FirstName = "Admin", LastName = "", ContactNo = admin.ContactNo, Email = admin.Email, Role = "Admin" };
//            }

//            var farmer = _context.Farmers.FirstOrDefault(f => f.ContactNo == contactNo && f.Password == password);
//            if (farmer != null)
//            {
//                return new { UserID = farmer.FarmerId, FirstName = farmer.FirstName, LastName = farmer.LastName, ContactNo = farmer.ContactNo, Email = farmer.Email, Role = "Farmer" };
//            }

//            var shopkeeper = _context.Shopkeepers.FirstOrDefault(s => s.ContactNo == contactNo && s.Password == password);
//            if (shopkeeper != null)
//            {
//                return new { UserID = shopkeeper.ShopkeeperId, FirstName = shopkeeper.FirstName, LastName = shopkeeper.LastName, ContactNo = shopkeeper.ContactNo, Email = shopkeeper.Email, Role = "Shopkeeper" };
//            }

//            var buyer = _context.Buyers.FirstOrDefault(b => b.ContactNo == contactNo && b.Password == password);
//            if (buyer != null)
//            {
//                return new { UserID = buyer.BuyerId, FirstName = buyer.FirstName, LastName = buyer.LastName, ContactNo = buyer.ContactNo, Email = buyer.Email, Role = "Buyer" };
//            }

//            return null;
//        }

//        private string GenerateJwtToken(int userId, string firstName, string lastName, string contactNo, string email, string role)
//        {
//            try
//            {
//                var tokenHandler = new JwtSecurityTokenHandler();
//                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

//                var tokenDescriptor = new SecurityTokenDescriptor
//                {
//                    Subject = new ClaimsIdentity(new[]
//                    {
//                        new Claim("UserID", userId.ToString()),
//                        new Claim("FirstName", firstName),
//                        new Claim("LastName", lastName),
//                        new Claim("ContactNo", contactNo),
//                        new Claim(ClaimTypes.Email, email),
//                        new Claim(ClaimTypes.Role, role)
//                    }),
//                    Expires = DateTime.UtcNow.AddHours(2),
//                    Issuer = _configuration["Jwt:Issuer"],
//                    Audience = _configuration["Jwt:Audience"],
//                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//                };

//                var token = tokenHandler.CreateToken(tokenDescriptor);
//                return tokenHandler.WriteToken(token);
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Error generating token", ex);
//            }
//        }
//    }

//    public class LoginRequest
//    {
//        public string ContactNo { get; set; }
//        public string Password { get; set; }
//    }
//}


//using FarmerBackend.Dto;
//using FarmerBackend.Models;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace FarmerBackend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IConfiguration _configuration;
//        private readonly ApmcdbContext _context;

//        public AuthController(IConfiguration configuration, ApmcdbContext context)
//        {
//            _configuration = configuration;
//            _context = context;
//        }

//        [HttpPost("Login")]
//        public IActionResult Login([FromBody] LoginRequest loginRequest)
//        {
//            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.ContactNo) || string.IsNullOrEmpty(loginRequest.Password))
//            {
//                return BadRequest(new { message = "Contact number and password are required" });
//            }

//            var user = GetUserByContactNoAndPassword(loginRequest.ContactNo, loginRequest.Password);
//            if (user == null)
//            {
//                return Unauthorized(new { message = "Invalid credentials" });
//            }

//            string jwtToken = GenerateJwtToken(user.UserID, user.FirstName, user.LastName, user.ContactNo, user.Email, user.Role);

//            return Ok(new
//            {
//                Token = jwtToken,
//                User = user,
//                ExpiresIn = 7200,
//                Message = "Login successful"
//            });
//        }

//        private dynamic GetUserByContactNoAndPassword(string contactNo, string password)
//        {
//            var admin = _context.Admins.FirstOrDefault(a => a.ContactNo == contactNo && a.Password == password);
//            if (admin != null)
//            {
//                return new { UserID = admin.AdminId, FirstName = "Admin", LastName = "", ContactNo = admin.ContactNo, Email = admin.Email, Role = "Admin" };
//            }

//            var farmer = _context.Farmers.FirstOrDefault(f => f.ContactNo == contactNo && f.Password == password);
//            if (farmer != null)
//            {
//                return new { UserID = farmer.FarmerId, FirstName = farmer.FirstName, LastName = farmer.LastName, ContactNo = farmer.ContactNo, Email = farmer.Email, Role = "Farmer" };
//            }

//            var shopkeeper = _context.Shopkeepers.FirstOrDefault(s => s.ContactNo == contactNo && s.Password == password);
//            if (shopkeeper != null)
//            {
//                return new { UserID = shopkeeper.ShopkeeperId, FirstName = shopkeeper.FirstName, LastName = shopkeeper.LastName, ContactNo = shopkeeper.ContactNo, Email = shopkeeper.Email, Role = "Shopkeeper" };
//            }

//            var buyer = _context.Buyers.FirstOrDefault(b => b.ContactNo == contactNo && b.Password == password);
//            if (buyer != null)
//            {
//                return new { UserID = buyer.BuyerId, FirstName = buyer.FirstName, LastName = buyer.LastName, ContactNo = buyer.ContactNo, Email = buyer.Email, Role = "Buyer" };
//            }

//            return null;
//        }

//        private string GenerateJwtToken(int userId, string firstName, string lastName, string contactNo, string email, string role)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(new[]
//                {
//                    new Claim("UserID", userId.ToString()),
//                    new Claim("FirstName", firstName),
//                    new Claim("LastName", lastName),
//                    new Claim("ContactNo", contactNo),
//                    new Claim(ClaimTypes.Email, email),
//                    new Claim(ClaimTypes.Role, role)
//                }),
//                Expires = DateTime.UtcNow.AddHours(2),
//                Issuer = _configuration["Jwt:Issuer"],
//                Audience = _configuration["Jwt:Audience"],
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };

//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return tokenHandler.WriteToken(token);
//        }
//    }

//    public class LoginRequest
//    {
//        public string ContactNo { get; set; }
//        public string Password { get; set; }
//    }
//}
using FarmerBackend.Dto;
using FarmerBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FarmerBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApmcdbContext _context;

        public AuthController(IConfiguration configuration, ApmcdbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.ContactNo) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest(new { message = "Contact number and password are required" });
            }

            var user = GetUserByContactNoAndPassword(loginRequest.ContactNo, loginRequest.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            string jwtToken = GenerateJwtToken(user.UserID, user.FirstName, user.LastName, user.ContactNo, user.Email, user.Role);

            return Ok(new
            {
                Token = jwtToken,
                User = user,
                ExpiresIn = 7200,
                Message = "Login successful"
            });
        }

        private dynamic GetUserByContactNoAndPassword(string contactNo, string password)
        {
            if (_context.Admins.Any(a => a.ContactNo == contactNo && a.Password == password))
            {
                var admin = _context.Admins.First(a => a.ContactNo == contactNo && a.Password == password);
                return new { UserID = admin.AdminId, FirstName = "Admin", LastName = "", ContactNo = admin.ContactNo, Email = admin.Email, Role = "Admin" };
            }
            if (_context.Farmers.Any(f => f.ContactNo == contactNo && f.Password == password))
            {
                var farmer = _context.Farmers.First(f => f.ContactNo == contactNo && f.Password == password);
                return new { UserID = farmer.FarmerId, FirstName = farmer.FirstName, LastName = farmer.LastName, ContactNo = farmer.ContactNo, Email = farmer.Email, Role = "Farmer" };
            }
            if (_context.Shopkeepers.Any(s => s.ContactNo == contactNo && s.Password == password))
            {
                var shopkeeper = _context.Shopkeepers.First(s => s.ContactNo == contactNo && s.Password == password);
                return new { UserID = shopkeeper.ShopkeeperId, FirstName = shopkeeper.FirstName, LastName = shopkeeper.LastName, ContactNo = shopkeeper.ContactNo, Email = shopkeeper.Email, Role = "Shopkeeper" };
            }
            if (_context.Buyers.Any(b => b.ContactNo == contactNo && b.Password == password))
            {
                var buyer = _context.Buyers.First(b => b.ContactNo == contactNo && b.Password == password);
                return new { UserID = buyer.BuyerId, FirstName = buyer.FirstName, LastName = buyer.LastName, ContactNo = buyer.ContactNo, Email = buyer.Email, Role = "Buyer" };
            }
            return null;
        }

        private string GenerateJwtToken(int userId, string firstName, string lastName, string contactNo, string email, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserID", userId.ToString()),
                    new Claim("FirstName", firstName),
                    new Claim("LastName", lastName),
                    new Claim("ContactNo", contactNo),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class LoginRequest
    {
        public string ContactNo { get; set; }
        public string Password { get; set; }
    }
}
