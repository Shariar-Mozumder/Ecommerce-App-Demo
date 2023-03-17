using Domain;
using Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service
{
    public class UserService : IUserService
    {
        public readonly EComDBContext _context;
        public UserService(EComDBContext eComDBContext)
        {
            _context= eComDBContext;
        }

        public async Task<User> SaveUser(User user)
        {

            try
            {
                if (user.UserID > 0)
                {
                    _context.User.Update(user);
                    var isUpdated = _context.SaveChangesAsync();
                }
                else
                {
                    await _context.User.AddAsync(user);
                    var isAdded = _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return user;
        }

        public async Task<List<User>> GetUserList()
        {
            List<User> users = new List<User>();
            try
            {
                users = _context.User.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return users;
        }

        public async Task<User> GetUserByID(long userID)
        {
            User user = new User();
            try
            {
                if (userID > 0)
                {
                    user =  _context.User.Where(x => x.UserID == userID).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return user;
        }

        public async Task<bool> AuthenticateUserLogin(string email, string password)
        {
            try
            {
                var user=_context.User.Where(x => x.Email==email && x.Password==password).FirstOrDefault();
                if (user!=null)
                {
                    return true;
                }
                
            }
            catch (Exception)
            {

                throw;
            }

            return false;
            
        }
    }

    public interface IUserService
    {
        public Task<User> SaveUser(User user);
        public Task<List<User>> GetUserList();
        public  Task<User> GetUserByID(long userID);
        public Task<bool> AuthenticateUserLogin(string email, string password);
    }
}
