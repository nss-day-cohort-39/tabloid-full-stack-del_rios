using System;
using System.Collections.Generic;
using System.Linq;
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
            _subscriptionRepository.Add(sub);
            return CreatedAtAction("Get", new { id = sub.Id }, sub);
        }

        [HttpGet("{id}")]
        public IActionResult GetCurrentUserSubs(int id)
        {
          
            var subscriptions = _subscriptionRepository.GetByUserProfileId(id);
            if (subscriptions == null)
            {
                return NotFound();
            }
            return Ok(subscriptions);
        }
    }
}
