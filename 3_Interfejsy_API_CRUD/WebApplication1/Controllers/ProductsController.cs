﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsApi.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductsController(ProductContext context)
        {
            _context = context;

            //if (_context.Products.Count() == 0)
            //{
            //    _context.Products.Add(new Product { Name = "Produkt_1"});
            //    _context.SaveChanges();
            //}
        }

        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _context.Products.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var Product = _context.Products.Find(id);

            if (Product == null)
            {
                return NotFound();
            }

            return Product;
        }

        [HttpGet("byname/{name}")]
        public ActionResult<Product> GetProduct(string name)
        {
            var Product = _context.Products
                .FirstOrDefault(p => p.Name.ToLower() == name.ToLower());

            if (Product == null)
            {
                return NotFound();
            }

            return Product;
        }

        [HttpPost]
        public ActionResult<Product> PostProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Products.Update(product);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var Product = _context.Products.Find(id);

            if (Product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(Product);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

