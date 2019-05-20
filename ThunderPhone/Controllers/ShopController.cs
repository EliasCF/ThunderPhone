using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ThunderPhone.Models;

namespace ThunderPhone.Controllers
{
    public class ShopController : Controller
    {
        public DatabaseContext db { get; }

        public ShopController (DatabaseContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("[controller]/[action]/{productId?}")]
        public IActionResult Item(string productId)
        {
            ProductsModel product = db.Products.Single(p => p.ProductId == Guid.Parse(productId));

            return View(product);
        }
    }
}