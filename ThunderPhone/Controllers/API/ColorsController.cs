using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ThunderPhone.Models;

namespace ThunderPhone.Controllers.API
{
    [Route("api/colors")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        public DatabaseContext db { get; set; }

        public ColorsController(DatabaseContext context)
        {
            db = context;
        }

        public List<ColorsModel> GetBrands() => db.Colors.ToList();
    }
}