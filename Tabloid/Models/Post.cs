using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public string ImageLocation { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        public DateTime? PublishDateTime { get; set; }

        [Required]
        public bool IsApproved { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
        public Category Category { get; set; }
        public List<PostTag> PostTags { get; set; } = new List<PostTag>();
        public List<PostReaction> PostReactions { get; set; } = new List<PostReaction>();
        public List<Comment> Comments { get; set; }

    }
}
