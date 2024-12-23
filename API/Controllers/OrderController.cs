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

        [HttpGet("GetOrderList")]
        public async Task<ActionResult<List<OrderDto>>> GetOrders(){
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x=>x.BuyerId == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}",Name ="GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id){
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x=>x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<int>> CreateOrder(){
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
                /* if(item.IsSelected == true){ */
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
                /* } */
            }

            //subtotal and delivery fee
            var subtotal = items.Sum(item=>item.Price*item.Quantity);
            var deliveryFee = subtotal > 70 ? 0:20;

            //find the user and the default address
            var user = await _context.Users
                .Include(u => u.Address) // Load Address navigation property
                .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            var userAddress = user.Address.FirstOrDefault(a=>a.IsDefault);
            if(userAddress ==null) return BadRequest(new ProblemDetails{Title="Could not find default address"});
            

            //create order
            var order = new Order{
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = new ShippingAddress{
                    FirstName = userAddress.FirstName,
                    LastName = userAddress.LastName,
                    Address1 = userAddress.Address1,
                    City = userAddress.City,
                    Province = userAddress.Province,
                    PostalCode = userAddress.PostalCode,
                    Country = userAddress.Country
                },
                Subtotal = subtotal,
                DeliveryFee = deliveryFee
            };

            //tracking
            _context.Orders.Add(order);
            var result = await _context.SaveChangesAsync()>0;
            
            if(result) return CreatedAtRoute("GetOrder",new{id=order.Id},order.Id);
            return BadRequest("Problem creating order");
        }
    }
}