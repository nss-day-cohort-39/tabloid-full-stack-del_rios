using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class TagRepository
    {
        private readonly ApplicationDbContext _context;

        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Tag> GetAll()
        {
            return _context.Tag.OrderBy(c => c.Name).ToList();
        }

        public Tag GetById(int Id)
        {
            return _context.Tag
                       .FirstOrDefault(c => c.Id == Id);
        }

        public void Add(Tag Tag)
        {
            _context.Add(Tag);
            _context.SaveChanges();
        }

        public void Update(Tag tag)
        {
            _context.Entry(tag).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var tag = GetById(id);
            _context.Tag.Remove(tag);
            _context.SaveChanges();
        }

        public List<Tag> GetTagsByPostId(int id)
        {
            return _context.Tag
                .Include(t => t.Id == t.PostTag.TagId)
                .Include(t => t.PostTag.PostId == t.Post.Id)
                .Where(t => t.PostTag.PostId == id)
                .OrderBy(c => c.Name)
                .ToList();
        }
    }
}