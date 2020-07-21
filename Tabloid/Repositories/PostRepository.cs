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
                           .Include(p => p.PostTags)
                           .ThenInclude(pt => pt.Tag)
                           .Where(p => p.IsApproved == true && p.PublishDateTime <= DateTime.Now)
                           .OrderByDescending(p => p.PublishDateTime).ToList();
        }

        public List<Post> GetAllUnapprovedPost()
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.Category)
                           .Where(p => p.IsApproved == false && p.PublishDateTime <= DateTime.Now)
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
                           .Include(p => p.PostTags)
                           .ThenInclude(pt => pt.Tag)
                           .Include(p => p.Comments)
                           .ThenInclude(c => c.UserProfile)
                           .Include(p => p.PostReactions)
                           .ThenInclude(pr => pr.Reaction)
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
                               Comments = (List<Comment>)p.Comments.OrderByDescending(c => c.CreateDateTime),
                               PostTags = p.PostTags,
                               PostReactions = p.PostReactions
                           }).FirstOrDefault(p => p.Id == id);
        }

        public Post GetApprovedPostById(int id)
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .ThenInclude(up => up.UserType)
                           .Include(p => p.Category)
                           .Include(p => p.PostTags)
                           .ThenInclude(pt => pt.Tag)
                           .Include(p => p.Comments)
                           .ThenInclude(c => c.UserProfile)
                           .Include(p => p.PostReactions)
                           .ThenInclude(pr => pr.Reaction)
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
                               Comments = (List<Comment>)p.Comments.OrderByDescending(c => c.CreateDateTime),
                               PostTags = p.PostTags,
                               PostReactions = p.PostReactions
                           }).FirstOrDefault(p => p.Id == id);
        }
        //
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
            var relatedTags = GetPostTagByPostId(id);
            if (relatedTags != null)
            {
                _context.PostTag.RemoveRange(relatedTags);
            }

            _context.Post.Remove(post);
            _context.SaveChanges();
        }
        //Post tag repo methods start here

        //made method to get pt by post id. then added it to the post delete method and
        // past in the post id.
        public PostTag GetPostTagById(int id)
        {
            return _context.PostTag
                           .FirstOrDefault(pt => pt.Id == id);
        }

        public PostTag GetPostTagByPostId(int id)
        {
            return _context.PostTag
                 .FirstOrDefault(pt => pt.PostId == id);

        }

        public void InsertTag(PostTag postTag)
        {
            _context.PostTag.Add(postTag);
            _context.SaveChanges();
        }

        public void RemoveTag(int id)
        {
            var postTag = GetPostTagById(id);
            _context.PostTag.Remove(postTag);
            _context.SaveChanges();
        }

        //Post reaction repo methods start here
        public PostReaction GetPostReactionById(int id)
        {
            return _context.PostReaction
                           .FirstOrDefault(pr => pr.Id == id);
        }

        public void InsertReaction(PostReaction postReaction)
        {
            _context.PostReaction.Add(postReaction);
            _context.SaveChanges();
        }

        public void RemoveReaction(int id)
        {
            var postReaction = GetPostReactionById(id);
            _context.PostReaction.Remove(postReaction);
            _context.SaveChanges();
        }
       
        public List<Post> Search(string criterion, bool sortDescending)
        {
            var query = _context.Post
                                .Include(p => p.PostTags)
                                 .ThenInclude(pt => pt.Tag)
                                .Include(p => p.UserProfile)
                                .Where(p => p.PostTags.Any(pt => pt.Tag.Name.Contains(criterion)));

            return sortDescending
                ? query.OrderByDescending(p => p.CreateDateTime).ToList()
                : query.OrderBy(p => p.CreateDateTime).ToList();

        }

    }
}
