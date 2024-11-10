using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController:ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenServices _tokenServices;

        public AccountController(UserManager<User> userManager, TokenServices tokenServices)
        {
            _userManager = userManager;
            _tokenServices = tokenServices;
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

            // Return user details along with the generated token
            return new UserDto
            {
                Email = user.Email,
                Token = token
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto){
            var user = new User{
                FirstName = registerDto.FirstName, 
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                StreetAddress = registerDto.StreetAddress,
                City = registerDto.City,
                Province = registerDto.Province,
                PostalCode = registerDto.PostalCode,
                UserName = registerDto.Email
                };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if(!result.Succeeded){
                foreach(var error in result.Errors){
                    ModelState.AddModelError(error.Code,error.Description);
                }
                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(user,"Member");
            await _userManager.SetLockoutEnabledAsync(user, true); // Enable lockout for the user
            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            return new UserDto{
                Email= user.Email,
                Token = await _tokenServices.GenerateToken(user)
            };
        }
        
    }
}