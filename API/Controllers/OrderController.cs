using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private StoreContext _context;

        public OrderController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders(){
            return await _context.Orders
                .Include(o=>o.OrderItems)
                .Where(x=>x.BuyerId == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}",Name ="GetOrder")]
        public async Task<ActionResult<Order>> GetOrder(int id){
            return await _context.Orders
                .Include(o=>o.OrderItems)
                .Where(x=>x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto createOrderDto){
            //get basket
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();
            
            //check basket if it exist
            if(basket == null)  return BadRequest(new ProblemDetails{Title = "Could not find basket"});
            
            //create order items
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                if(item.IsSelected == true){
                    var productItem = await _context.Products.FindAsync(item.ProductId);
                    var itemOrdered = new ProductItemOrdered
                    {
                        ProductId = productItem.Id,
                        Name = productItem.Name,
                        PictureUrl = productItem.PictureUrl,
                    };
                    var orderItem = new OrderItem
                    {
                        ItemOrdered = itemOrdered,
                        Price = productItem.Price,
                        Quantity = item.Quantity
                    };
                    items.Add(orderItem);
                    productItem.QuantityInStock -= item.Quantity;
                }
            }

            //subtotal and delivery fee
            var subtotal = items.Sum(item=>item.Price*item.Quantity);
            var deliveryFee = subtotal > 70 ? 0:20;

            //find the user and the default address
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName == User.Identity.Name);
            var address = user.Address.FirstOrDefault(a=>a.IsDefault);
            if(address ==null) return BadRequest(new ProblemDetails{Title="Could not find default address"});
            
            //create order
            var order = new Order{
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = createOrderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee
            };

            //tracking
            _context.Orders.Add(order);
            _context.Update(order);
            var result = await _context.SaveChangesAsync()>0;
            
            if(result) return CreatedAtRoute("GetOrder",new{id=order.Id},order.Id);
            return BadRequest("Problem creating order");
        }
    }
}