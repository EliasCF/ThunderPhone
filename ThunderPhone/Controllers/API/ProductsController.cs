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
        public List<ProductsModel> GetProducts () => 
            db.Products
                .ToList();

        [HttpGet("{prudctId}")]
        public ProductsModel GetProduct (string ProductId) => 
            db.Products
                .Single(p => p.ProductId == Guid.Parse(ProductId));
    }
}