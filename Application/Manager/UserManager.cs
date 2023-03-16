using Application.Service;
using Application.Utility.Common;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Manager
{
    public class UserManager : IUserManager
    {
        public readonly IUserService _userService;
        public UserManager(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<ResponseMessage> SaveUser(User user)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                if (user != null)
                {
                    var res = await _userService.SaveUser(user);
                    if (res.UserID > 0)
                    {
                        responseMessage.Message = "User Saved Successfully";
                        responseMessage.ResponseObj = res;
                        responseMessage.ResponseCode = 200;
                    }
                    else
                    {
                        responseMessage.Message = "Save faled.";
                        responseMessage.ResponseCode = 404;
                    }
                }
                else
                {
                    responseMessage.Message = "Input Null.";
                    responseMessage.ResponseCode = 404;
                }
            }
            catch (Exception ex)
            {

                responseMessage.Message = ex.Message.ToString();
                responseMessage.ResponseCode = 500;
            }


            return responseMessage;
        }

        public async Task<ResponseMessage> GetUserList()
        {
            ResponseMessage responseMessage = new ResponseMessage();
            List<User> lstUser = new List<User>();
            try
            {
                lstUser = await _userService.GetUserList();
                if (lstUser.Count() > 0)
                {
                    responseMessage.ResponseObj = lstUser;
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "Get User List Successfully.";
                }
                else
                {
                    responseMessage.ResponseObj = lstUser;
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "No Data Found.";
                }
            }
            catch (Exception ex)
            {
                responseMessage.Message = ex.Message.ToString();
                responseMessage.ResponseCode = 500;
            }

            return responseMessage;
        }

        public async Task<ResponseMessage> GetUserbyID(long userID)
        {
            ResponseMessage responseMessage = new ResponseMessage();

            try
            {
                var user = _userService.GetUserByID(userID);
                if (user != null)
                {
                    responseMessage.ResponseObj = user;
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "Get User Successfully.";
                }
                else
                {
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "No Data Found.";
                }

            }
            catch (Exception ex)
            {
                responseMessage.Message = ex.Message.ToString();
                responseMessage.ResponseCode = 500;
            }

            return responseMessage;
        }
    }

    public interface IUserManager
    {
        Task<ResponseMessage> SaveUser(User user);
        Task<ResponseMessage> GetUserList();
        Task<ResponseMessage> GetUserbyID(long userID);
    }
}
