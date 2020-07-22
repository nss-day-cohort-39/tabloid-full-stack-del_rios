using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Subscription GetById(int Id)
        {
            return _context.Subscription
                       .FirstOrDefault(s => s.Id == Id);
        }

        public List<Post> GetByUserProfileId(int id)
        {
            return _context.Subscription
                             
                            .Where(s => s.SubscriberUserProfileId == id)
                            .Where(s => s.EndDateTime == null)
                            .Include(s => s.ProviderUserProfile)
                            .ThenInclude(u => u.Posts)
                            .SelectMany(s => s.ProviderUserProfile.Posts)
                            .ToList();
        }

        public void Add(Subscription sub)
        {
            _context.Add(sub);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var sub = GetById(id);
            _context.Subscription.Remove(sub);
            _context.SaveChanges();
        }

        public List<Subscription> getSubscriptionsByUser(int id)
        {
            return _context.Subscription
                            .Where(s => s.SubscriberUserProfileId == id)
                            .Where(s => s.EndDateTime == null)
                            .ToList();
        }
    }
}
