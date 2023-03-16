using Domain;
using Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service
{
    public class ProductService : IProductService
    {
        public readonly EComDBContext _context;
        public ProductService(EComDBContext eComDBContext)
        {
            _context = eComDBContext;
        }

        public async Task<Product> SaveProduct(Product product)
        {
            
            try
            {
                if (product.ProductID>0)
                {
                    _context.Product.Update(product);
                    var isUpdated=_context.SaveChangesAsync();
                }
                else
                {
                    await _context.Product.AddAsync(product);
                    var isAdded = _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return product;
        }

        public async Task<List<Product>> GetProductList()
        {
            List<Product> products = new List<Product>();
            try
            {
                products = _context.Product.ToList();
                var check = products;
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return products;
        }

        public async Task<Product> GetProductByID(long productID)
        {
            Product product = new Product();
            try
            {
                if (productID > 0)
                {
                    product = _context.Product.Where(x => x.ProductID == productID).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return product;
        }

        public async Task<int> SaveImages(List<Image> images)
        {
            int res = 0;
            try
            {
                await _context.Image.AddRangeAsync(images);
                res =await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return res;
        }
    }

    public interface IProductService
    {
        public Task<Product> SaveProduct(Product product);
        public Task<List<Product>> GetProductList();
        public Task<Product> GetProductByID(long productID);
        public Task<int> SaveImages(List<Image> images);
    }
}
