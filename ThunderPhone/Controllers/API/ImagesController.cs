using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ThunderPhone.Models;

namespace ThunderPhone.Controllers.API
{
    [Route("api/images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        public DatabaseContext db { get; set; }

        public ImagesController(DatabaseContext context)
        {
            db = context;
        }

        [HttpGet]
        public List<ImagesModel> GetImages () => 
            db.Images
                .ToList();

        [HttpGet("{productId}")]
        public List<ImagesModel> GetImagesByProduct (int productId) => 
            db.Images
                .Where(i => i.ProductId == productId)
                .ToList();
    }
}