using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenServices
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        public TokenServices(UserManager<User> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        public async Task<string> GenerateToken(User user){
            var claims = new List<Claim>{
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber ?? string.Empty),
            };
            
            var roles = await _userManager.GetRolesAsync(user);
            foreach(var role in roles){
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:TokenKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenOptions = new JwtSecurityToken(
                issuer:null,
                audience: null,
                claims: claims,
                expires:DateTime.Now.AddHours(2),
                signingCredentials:creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}