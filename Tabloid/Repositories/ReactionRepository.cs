using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class ReactionRepository
    {
        private readonly ApplicationDbContext _context;

        public ReactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Reaction> GetAll()
        {
            return _context.Reaction.OrderBy(r => r.Name).ToList();
        }

        public Reaction GetById(int Id)
        {
            return _context.Reaction
                       .FirstOrDefault(r => r.Id == Id);
        }

        public void Add(Reaction reaction)
        {
            _context.Add(reaction);
            _context.SaveChanges();
        }

        public void Update(Reaction reaction)
        {
            _context.Entry(reaction).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var reaction = GetById(id);
            var postReaction = _context.PostReaction.Where(pr => pr.ReactionId == id);
            _context.PostReaction.RemoveRange(postReaction);
            _context.Reaction.Remove(reaction);
            _context.SaveChanges();
        }
       



    }
}