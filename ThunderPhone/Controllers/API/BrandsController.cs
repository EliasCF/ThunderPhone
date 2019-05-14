using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThunderPhone.Models;

namespace ThunderPhone.Controllers.API
{
    [Route("api/brands")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        public DatabaseContext db { get; set; }

        public BrandsController(DatabaseContext context)
        {
            db = context;
        }

        public List<BrandsModel> GetBrands() => db.Brands.ToList();
    }
}