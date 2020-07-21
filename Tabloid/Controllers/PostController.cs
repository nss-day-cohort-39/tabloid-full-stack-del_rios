using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostRepository _postRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public PostController(ApplicationDbContext context)
        {
            _postRepository = new PostRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("unapproved")]
        public IActionResult GetUnApprovedPost()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile.UserTypeId == 1)
            {
                return Ok(_postRepository.GetAllUnapprovedPost());
            }
            else
            {
                return Unauthorized();
            }
          
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_postRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _postRepository.GetById(id);
            var aprovedPost = _postRepository.GetApprovedPostById(id);
            if (post == null && aprovedPost == null)
            {
                return NotFound();
            }
            if (aprovedPost != null)
            {
                return Ok(aprovedPost);
            }
            else if (post != null && (post.UserProfileId == currentUserProfile.Id || currentUserProfile.UserTypeId == 1))
            {
                return Ok(post);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }


        [HttpPost("addtag")]
        public IActionResult Post(PostTag postTag)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _postRepository.GetById(postTag.PostId);

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }
            _postRepository.InsertTag(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }

        [HttpDelete("addtag/{id}")]
        public IActionResult DeletePostTag(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var postTag = _postRepository.GetPostTagById(id);

            var post = _postRepository.GetById(postTag.PostId);

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            _postRepository.RemoveTag(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != post.UserProfileId && currentUserProfile.UserTypeId != 1)
            {
                return Unauthorized();
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _postRepository.GetById(id);

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            _postRepository.Delete(id);
            return NoContent();
        }

        //Controller methods that deal with post reactions begin here
        [HttpPost("react")]
        public IActionResult Post(PostReaction postReaction)
        {


            _postRepository.InsertReaction(postReaction);
            return CreatedAtAction("Get", new { id = postReaction.Id }, postReaction);
        }


        [HttpDelete("deletereaction/{id}")]
        public IActionResult DeletePostReaction(int id)
        {

            _postRepository.RemoveReaction(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
