using Application.Service;
using Application.Utility.Common;
using Application.Utility.VMs;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Manager
{
    public class ProductManager : IProductManager
    {
        public readonly IProductService _productService;

        public ProductManager(IProductService productService)
        {
            _productService=productService;
        }

        public async Task<ResponseMessage> SaveProduct(vmSaveProduct productvm)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            List<Image> lstImage= new List<Image>();
            try
            {
                if (productvm != null)
                {
                    var prod = await _productService.SaveProduct(productvm.Product);
                    if (prod.ProductID > 0)
                    {
                        if (productvm.ImageList.Count()>0)
                        {
                            foreach (var item in productvm.ImageList)
                            {
                                Image img = new Image();
                                img.ProductID = prod.ProductID;
                                img.ImageName = item.ImageName;

                                lstImage.Add(img);
                            }
                            await _productService.SaveImages(lstImage);
                        }
                        
                        responseMessage.Message = "Product Saved Successfully";
                        responseMessage.ResponseObj = prod;
                        responseMessage.ResponseCode = 200;
                    }
                    else
                    {
                        responseMessage.Message = "Save faled.";
                        responseMessage.ResponseCode = 404;
                    }
                }
                else
                {
                    responseMessage.Message = "Input Null.";
                    responseMessage.ResponseCode = 404;
                }
            }
            catch (Exception ex)
            {

                responseMessage.Message = ex.Message.ToString();
                responseMessage.ResponseCode= 500;
            }
            

            return responseMessage;
        }

        public async Task<ResponseMessage> GetProductList()
        {
            ResponseMessage responseMessage = new ResponseMessage();
            List<vmSaveProduct> lstProduct = new List<vmSaveProduct>();
            try
            {
                lstProduct=await _productService.GetProductList();
                if (lstProduct.Count() > 0)
                {
                    responseMessage.ResponseObj = lstProduct;
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "Get Product List Successfully.";
                }
                else
                {
                    responseMessage.ResponseObj = lstProduct;
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "No Data Found.";
                }
            }
            catch (Exception ex)
            {
                responseMessage.Message = ex.Message.ToString();
                responseMessage.ResponseCode = 500;
            }

            return responseMessage;
        }

        public async Task<ResponseMessage> GetProductbyID(long productID)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            
            try
            {
                vmSaveProduct product =await _productService.GetProductByID(productID);
                if(product!= null)
                {
                    responseMessage.ResponseObj = product;
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "Get Product Successfully.";
                }
                else
                {
                    responseMessage.ResponseCode = 200;
                    responseMessage.Message = "No Data Found.";
                }
               
            }
            catch (Exception ex)
            {
                responseMessage.Message = ex.Message.ToString();
                responseMessage.ResponseCode = 500;
            }

            return responseMessage;
        }
    }

    public interface IProductManager
    {
        Task<ResponseMessage> SaveProduct(vmSaveProduct productvm);
        Task<ResponseMessage> GetProductList();
        Task<ResponseMessage> GetProductbyID(long productID);
    }
}
