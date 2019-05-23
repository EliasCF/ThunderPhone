using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ThunderPhone.Models.API
{
    public class ApiProductsModel
    {
        public int Id { get; set; }

        public Guid ProductId { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        public ColorsModel Color { get; set; }

        public BrandsModel Brand { get; set; }

        public CategoriesModel Category { get; set; }

        public string Description { get; set; }

        public DateTime AdditionDate { get; set; }

        public List<ImagesModel> Images { get; set; }
    }
}
