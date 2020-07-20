using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private Comment GetById(int id)
        {
            return _context.Comment.FirstOrDefault(c => c.Id == id);
        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var subscription = GetById(id);
            _context.Subscription.Remove(subscription);
            _context.SaveChanges();
        }
    }
}