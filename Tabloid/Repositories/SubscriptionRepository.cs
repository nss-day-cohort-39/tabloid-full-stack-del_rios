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

    }
}
