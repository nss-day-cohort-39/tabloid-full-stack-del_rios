using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public UserProfile GetByUserId(int id)
        {
            return _context.UserProfile
                       .Include(up => up.UserType)
                       .Include(up => up.Subscriptions)
                       .FirstOrDefault(up => up.Id == id);
        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile
                .Include(up => up.UserType)
                .OrderBy(up => up.DisplayName)
                .ToList();
                
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }

        public void Update(UserProfile userProfile, UserProfile currentUserProfile)
        {
            int ActiveAdmins = _context.UserProfile.Count(up => up.UserTypeId == 1 && up.IsActive == true);

            try
            {
                if (currentUserProfile.Id != userProfile.Id)
                {

                    _context.Entry(userProfile).State = EntityState.Modified;
                    _context.SaveChanges();
                }
                else if (ActiveAdmins >= 2)
                {
                    if (userProfile.IsActive != currentUserProfile.IsActive)
                    {
                        currentUserProfile.IsActive = false;
                        _context.SaveChanges();
                    }
                    else if (userProfile.UserTypeId != currentUserProfile.UserTypeId)
                    {
                        currentUserProfile.UserTypeId = UserType.AUTHOR_ID;
                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
        }
    }
}
