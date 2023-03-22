using Application.Manager;
using Application.Service;
using Application.Utility.Common;
using Application.Utility.VMs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserManager _userManager;
        public readonly IUserService _userService;
        public UserController(IUserManager userManager, IUserService userService)
        {
            _userManager= userManager;
            _userService= userService;
        }

        //[HttpPost]
        //[Route("login")]
        //public async Task<ResponseMessage> Login([FromBody] User user)
        //{
        //    ResponseMessage responseMessage = new ResponseMessage();
        //    // Authenticate user (in your case, you might query your database to authenticate the user)
        //    var isAuthenticated = await _userManager.AuthenticateUserAsync(user.Email, user.Password);
        //    if (!isAuthenticated)
        //    {
        //        //responseMessage.JWTToken=null;
        //        responseMessage.ResponseCode=401;
        //        responseMessage.Message="UnAuthorized.";
        //        return responseMessage;
        //    }

        //    // Build the token
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes("HelloOmnivarityThisIsShariarforyou"); // replace with your own secret key
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new Claim[]
        //        {
        //    new Claim(ClaimTypes.Name, user.Email),
        //    new Claim(ClaimTypes.Role, (bool)user.IsAdmin ? "Admin" : "User")
        //        }),
        //        Expires = DateTime.UtcNow.AddDays(7), // adjust as needed
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);

        //    // Return the token as a response
        //    //responseMessage.JWTToken=tokenHandler.WriteToken(token);
        //    responseMessage.ResponseCode=200;
        //    responseMessage.Message="Authorized.";
        //    return responseMessage;
            
        //}

        // Method to authenticate user (in your case, you might query your database to authenticate the user)


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var isAuthenticated = await _userManager.AuthenticateUserAsync(user.Email, user.Password);

            if (isAuthenticated == false)
                return BadRequest(new { message = "Email or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("HelloOmnivarityThisIsShariarforyouWithMyEcommerceProject");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            //new Claim(ClaimTypes.Name, user.UserID.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.IsAdmin == true ? "Admin" : "User")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            var loggedinUser = await _userService.GetUserbyEmail(user.Email);
            // return basic user info and authentication token
            return Ok(new
            {
                UserID = loggedinUser.UserID,
                FirstName = loggedinUser.FirstName,
                LastName = loggedinUser.LastName,
                Email = loggedinUser.Email,
                IsAdmin = loggedinUser.IsAdmin,
                Token = tokenString
            });
        }

        [HttpPost]
        [Route("SaveOrUpdateUser")]
        public async Task<ResponseMessage> SaveUser(RequestMessage requestMessage)
        {
            User user = JsonConvert.DeserializeObject<User>(requestMessage.RequestObj.ToString());
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                responseMessage = await _userManager.SaveUser(user);

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return responseMessage;
        }

        [HttpGet]
        [Route("GetUserList")]
        public async Task<ResponseMessage> GetUserList()
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                responseMessage = await _userManager.GetUserList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return responseMessage;
        }

        //[Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        [Route("GetUserByID")]
        public async Task<ResponseMessage> GetUserByID(RequestMessage requestMessage)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                VMIDs ids = JsonConvert.DeserializeObject<VMIDs>(requestMessage.RequestObj.ToString());
                responseMessage = await _userManager.GetUserbyID(ids.MyID);
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return responseMessage;
        }

        [HttpPost]
        [Route("GetUserbyEmail")]
        public async Task<ResponseMessage> GetUserbyEmail(RequestMessage requestMessage)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                VMIDs ids = JsonConvert.DeserializeObject<VMIDs>(requestMessage.RequestObj.ToString());
                responseMessage = await _userManager.GetUserbyEmail(ids.Email);
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return responseMessage;
        }
    }
}
