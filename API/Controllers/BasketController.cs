using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext storeContext){
            _context = storeContext;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return basket;
        }

        
        [HttpPost]
        public async Task<ActionResult<Basket>> AddItemToBasket(int productId,int quantity){
            //get basket;
            var basket = await RetrieveBasket();
            //if null, create basket
            if(basket==null) basket = CreateBasket();
            //get product;
            var product = await _context.Products.FindAsync(productId);
            if(product==null) return NotFound();
            //add item
            basket.AddItem(product,quantity);
            //save changes
            var result = await _context.SaveChangesAsync()>0;
            if(result) return StatusCode(201);
            return BadRequest();
        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity){
            //get basket
            //remove item or reduce quantity
            //save changes
            return Ok();
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

    }
}