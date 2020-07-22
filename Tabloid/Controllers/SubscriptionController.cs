using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {

        private readonly SubscriptionRepository _subscriptionRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly PostRepository _postRepostiory;

        public SubscriptionController(ApplicationDbContext context)
        {
            _subscriptionRepository = new SubscriptionRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _postRepostiory = new PostRepository(context);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _subscriptionRepository.Delete(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(Subscription sub)
        {
            var user = GetCurrentUserProfile();

            if(user.Id == sub.SubscriberUserProfileId)
            {
                _subscriptionRepository.Add(sub);
                return Ok(sub);
            }
            else
            {
                return Forbid();
            }
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("{id}")]
        public IActionResult GetCurrentUserPosts(int id)
        {
          
            var posts = _subscriptionRepository.GetByUserProfileId(id);
            if (posts == null)
            {
                return NotFound();
            }
            return Ok(posts);
        }

    [HttpGet("usersubs/{id}")]
    public IActionResult GetCurrentUserSubs(int id)
    {

        var subscriptions = _subscriptionRepository.getSubscriptionsByUser(id);
        if (subscriptions == null)
        {
            return NotFound();
        }
        return Ok(subscriptions);
    }
    }
}
