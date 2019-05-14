using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThunderPhone.Models;

namespace ThunderPhone.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public DatabaseContext db { get; set; }

        public CategoriesController(DatabaseContext context)
        {
            db = context;
        }

        [HttpGet]
        public List<CategoriesModel> GetCategories() => db.Categories.ToList();
    }
}