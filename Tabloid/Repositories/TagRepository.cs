﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
            var postTag = _context.PostTag.Where(pt => pt.TagId == id);
            _context.PostTag.RemoveRange(postTag);
            _context.Tag.Remove(tag);
            _context.SaveChanges();
        }
    }
}