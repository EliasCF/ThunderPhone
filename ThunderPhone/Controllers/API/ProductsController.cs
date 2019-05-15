using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ThunderPhone.Models;

namespace ThunderPhone.Controllers.API
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public DatabaseContext db { get; set; }

        public ProductsController (DatabaseContext context)
        {
            db = context;
        }

        [HttpGet]
        public List<ProductsModel> GetProducts (string categories, string brands, string colors)
        {
            var query = db.Products.AsQueryable();

            if (categories != null)
                query = query.Where(p => p.CategoryId == int.Parse(categories));

            if (brands != null)
                query = query.Where(p => p.BrandId == int.Parse(brands));

            if (colors != null)
                query = query.Where(p => p.ColorId == int.Parse(colors));

            return query.ToList();
        }

        [HttpGet("{prudctId}")]
        public ProductsModel GetProduct (string ProductId) => 
            db.Products
                .Single(p => p.ProductId == Guid.Parse(ProductId));
    }
}