using Domain;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
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
                    var existedUser = _context.User.Where(x => x.Email == user.Email).AsNoTracking().FirstOrDefault();
                    if (existedUser != null)
                    {
                        if (existedUser.UserID != user.UserID && existedUser.Email == user.Email)
                        {
                            return user;
                        }
                        else
                        {
                            _context.User.Update(user);
                            var isUpdated = _context.SaveChanges();
                        }
                    }
                    else
                    {
                        _context.User.Update(user);
                        var isUpdated = _context.SaveChanges();
                    }
                    
                }
                else
                {
                    if(user.Email!= null)
                    {
                        var existedUser = _context.User.Where(x => x.Email == user.Email).AsNoTracking().FirstOrDefault();
                        if (existedUser != null)
                        {
                            return user;
                        }
                        await _context.User.AddAsync(user);
                        var isAdded = _context.SaveChanges();

                    }
                    
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
                users = _context.User.AsNoTracking().ToList();
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
                    user =  _context.User.Where(x => x.UserID == userID).AsNoTracking().FirstOrDefault();
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
                var user=_context.User.Where(x => x.Email==email && x.Password==password).AsNoTracking().FirstOrDefault();
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

        public async Task<User> GetUserbyEmail(string email)
        {
            User user = new User();
            try
            {
                if (!string.IsNullOrEmpty(email))
                {
                    user = _context.User.Where(x => x.Email == email).AsNoTracking().FirstOrDefault();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return user;
        }
    }

    public interface IUserService
    {
        public Task<User> SaveUser(User user);
        public Task<List<User>> GetUserList();
        public  Task<User> GetUserByID(long userID);
        public Task<bool> AuthenticateUserLogin(string email, string password);
        public Task<User> GetUserbyEmail(string email);
    }
}
