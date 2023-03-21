using Application.Manager;
using Application.Utility.Common;
using Application.Utility.VMs;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProductController : ControllerBase
    {
        public readonly IProductManager _productManager;

        public ProductController(IProductManager productManager)
        {
            _productManager = productManager;
        }

        [HttpPost]
        [Route("SaveOrUpdateProduct")]
        public async Task<ResponseMessage> SaveProduct(RequestMessage requestMessage)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                vmSaveProduct productvm = JsonConvert.DeserializeObject<vmSaveProduct>(requestMessage.RequestObj.ToString());
               
                responseMessage = await _productManager.SaveProduct(productvm);

            }
            catch (Exception ex)
            {

                throw ex;
            }

            return responseMessage;
        }

        [HttpGet]
        [Route("GetProductList")]
        public async Task<ResponseMessage> GetProductList()
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                responseMessage= await _productManager.GetProductList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return responseMessage;
        }

        [HttpPost]
        [Route("GetProductByID")]
        public async Task<ResponseMessage> GetProductByID(RequestMessage requestMessage)
        {
            ResponseMessage responseMessage = new ResponseMessage();
            try
            {
                VMIDs ids= JsonConvert.DeserializeObject<VMIDs>(requestMessage.RequestObj.ToString());
                responseMessage = await _productManager.GetProductbyID(ids.MyID);
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return responseMessage;
        }
    }
}
