using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Tabloid.Data;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class PostRepository
    {
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Post> GetAll()
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.Category)
                           .Where(p => p.IsApproved == true && p.PublishDateTime <= DateTime.Now)
                           .OrderByDescending(p => p.PublishDateTime).ToList();
        }

        public List<Post> GetByUserProfileId(int id)
        {
            return _context.Post
                            .Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.UserProfileId == id)
                            .OrderByDescending(p => p.PublishDateTime).ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .ThenInclude(up => up.UserType)
                           .Include(p => p.Category)
                           .Include(p => p.Comments)
                           .ThenInclude(c => c.UserProfile)
                           .Select(p => new Post
                           {
                               Id = p.Id,
                               Title = p.Title,
                               Content = p.Content,
                               ImageLocation = p.ImageLocation,
                               CreateDateTime = p.CreateDateTime,
                               PublishDateTime = p.PublishDateTime,
                               IsApproved = p.IsApproved,
                               CategoryId = p.CategoryId,
                               UserProfileId = p.UserProfileId,
                               UserProfile = p.UserProfile,
                               Category = p.Category,
                               Comments = (List<Comment>)p.Comments.OrderByDescending(c => c.CreateDateTime)
                           }).FirstOrDefault(p => p.Id == id);
        }

            public Post GetApprovedPostById(int id)
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .ThenInclude(up => up.UserType)
                           .Include(p => p.Category)
                           .Include(p => p.Comments)
                           .ThenInclude(c => c.UserProfile)
                           .Where(p => p.IsApproved == true && p.PublishDateTime <= DateTime.Now)
                           .Select(p => new Post
                           {
                               Id = p.Id,
                               Title = p.Title,
                               Content = p.Content,
                               ImageLocation = p.ImageLocation,
                               CreateDateTime = p.CreateDateTime,
                               PublishDateTime = p.PublishDateTime,
                               IsApproved = p.IsApproved,
                               CategoryId = p.CategoryId,
                               UserProfileId = p.UserProfileId,
                               UserProfile = p.UserProfile,
                               Category = p.Category,
                               Comments = (List<Comment>)p.Comments.OrderByDescending(c => c.CreateDateTime)
                           }).FirstOrDefault(p => p.Id == id);
        }

        public void Add(Post post)
        {
            post.CreateDateTime = DateTime.Now;
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);
            _context.Post.Remove(post);
            _context.SaveChanges();
        }
    }
}
