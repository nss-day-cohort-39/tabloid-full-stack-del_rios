using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Data;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly ReactionRepository _reactionRepository;
        public ReactionController(ApplicationDbContext context)
        {
            _reactionRepository = new ReactionRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepository.GetAll());
        }

        [HttpGet("{Id}")]
        public IActionResult GetById(int Id)
        {
            return Ok(_reactionRepository.GetById(Id));
        }


        [HttpPost]
        public IActionResult Post(Reaction reaction)
        {
            _reactionRepository.Add(reaction);
            return CreatedAtAction("Get", new { id = reaction.Id }, reaction);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int id)
        {
            _reactionRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{Id}")]
        public IActionResult Put(int id, Reaction reaction)
        {
            if (id != reaction.Id)
            {
                return BadRequest();
            }
            _reactionRepository.Update(reaction);
            return NoContent();

        }
    }
}