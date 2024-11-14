using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController:ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenServices _tokenServices;
        private readonly StoreContext _storeContext;

        public AccountController(UserManager<User> userManager, TokenServices tokenServices, StoreContext storeContext)
        {
            _userManager = userManager;
            _tokenServices = tokenServices;
            _storeContext = storeContext;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            // If user doesn't exist
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            // If user is locked out, return an appropriate message
            if (await _userManager.IsLockedOutAsync(user))
            {
                return Unauthorized("Your account is locked. Please try again later.");
            }

            // Check password
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!result)
            {
                // Increment failed attempts
                await _userManager.AccessFailedAsync(user);
                return Unauthorized("Invalid credentials.");
            }

            // Reset failed attempts if login is successful
            await _userManager.ResetAccessFailedCountAsync(user);

            // Generate the JWT token after successful login
            var token = await _tokenServices.GenerateToken(user);

            var userBasket = await RetrieveBasket(loginDto.Email);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if(userBasket == null){
                CreateBasket(user);
            }

            if(anonBasket !=null){
                if(userBasket !=null){
                    
                    foreach(var item in anonBasket.Items){
                        var product = await _storeContext.Products.FindAsync(item.ProductId);
                        if (product == null) return NotFound();
                        //add item
                        userBasket.AddItem(product, item.Quantity);
                    }

                    _storeContext.Baskets.Remove(anonBasket);
                    Response.Cookies.Delete("buyerId");
                    
                }
            }

            //save changes
            await _storeContext.SaveChangesAsync();

            // Return user details along with the generated token
            return new UserDto
            {
                Email = user.Email,
                Token = token,
                Basket = MapBasketToDto(userBasket)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Email, Email = registerDto.Email ,FirstName = registerDto.UserName};

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");
            await _userManager.SetLockoutEnabledAsync(user, true); // Enable lockout for the user
            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            var userBasket = await RetrieveBasket(user.UserName);
            return new UserDto{
                Email= user.Email,
                Token = await _tokenServices.GenerateToken(user),
                Basket = MapBasketToDto(userBasket)
            };
        }

        
       private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId)){
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _storeContext.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private Basket CreateBasket(User user)
        {
            string buyerId = user.UserName;
            if(string.IsNullOrEmpty(buyerId)){
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            var basket = new Basket{BuyerId = buyerId};
            _storeContext.Baskets.Add(basket);
            return basket;
        }
        
        internal BasketDto MapBasketToDto(Basket basket){
            return new BasketDto{
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items?.Select(item=>new BasketItemDto{
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                }).ToList() ?? new List<BasketItemDto>(),
            };
        }
    }
}