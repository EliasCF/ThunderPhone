using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThunderPhone.Models;
using ThunderPhone.Models.API;

namespace ThunderPhone.Controllers.API
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public DatabaseContext Db { get; set; }

        public ProductsController (DatabaseContext context)
        {
            Db = context;
        }

        [HttpGet]
        public List<ApiProductsModel> GetProducts (
            int? amount, 
            string categories, 
            string brands, 
            string colors, 
            int? from)
        {
            var query = Db.Products
                .Include(p => p.Color)
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .OrderByDescending(p => p.Id)
                .AsQueryable();

            var bla = query.ToList();

            if (categories != null)
                query = query.Where(p => p.CategoryId == int.Parse(categories));

            if (brands != null)
                query = query.Where(p => p.BrandId == int.Parse(brands));

            if (colors != null)
                query = query.Where(p => p.ColorId == int.Parse(colors));

            if (from != null && amount != null)
                query = query.Skip(from.GetValueOrDefault());

            if (amount != null)
                query = query.Take(amount.GetValueOrDefault());

            List<ApiProductsModel> result = new List<ApiProductsModel>();

            query.ToList().ForEach(product => 
            {
                result.Add(ConvertToApiModel(product));
            });

            return result;
        }

        [HttpGet("{productId}")]
        public ApiProductsModel GetProduct (string ProductId)
        {
            if (ProductId == null) return null;

            var model = Db.Products
                .Include(p => p.Color)
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Single(p => p.ProductId == Guid.Parse(ProductId));

            return ConvertToApiModel(model);
        }

        //Convert from ProductsModel to ApiProductsModel
        public ApiProductsModel ConvertToApiModel(ProductsModel model)
        {
            return new ApiProductsModel
            {
                Id = model.Id,
                ProductId = model.ProductId,
                Name = model.Name,
                Price = model.Price,
                Color = model.Color,
                Brand = model.Brand,
                Category = model.Category,
                Description = model.Description,
                AdditionDate = model.AdditionDate,
                Images = Db.Images.Where(i => i.ProductId == model.Id).ToList()
            };
        } 
    }
}