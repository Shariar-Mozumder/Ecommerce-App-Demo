using Application.Manager;
using Application.Utility.Common;
using Application.Utility.VMs;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserManager _userManager;
        public UserController(IUserManager userManager)
        {
            _userManager= userManager;
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
    }
}
