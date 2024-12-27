using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly StoreContext _context;

        public AddressController(StoreContext context)
        {
            _context = context;
        }

        // 1. CreateAddress: Add an address for a specific user
        [HttpPost(Name ="CreateAddress")]
        public async Task<IActionResult> CreateAddress( AddressDto addressDto)
        {
            // Validate input
            if (addressDto == null)
                return BadRequest("Invalid address data.");

            // Find the user
            var user = await _context.Users.Include(u => u.Address)
                                           .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            if (user == null)
                return NotFound("User not found.");

            // Update other addresses to not be default
            foreach (var address in user.Address)
            {
                address.IsDefault = false;
            }
            // Add new address
            var newAddress = new UserAddress
            {
                FirstName = addressDto.FirstName,
                LastName = addressDto.LastName,
                Address1 = addressDto.Address1,
                City = addressDto.City,
                Province = addressDto.Province,
                PostalCode = addressDto.PostalCode,
                Country = addressDto.Country,
                UserId = user.Id,
                IsDefault = true
            };

            user.Address.Add(newAddress);
            await _context.SaveChangesAsync();

            return Ok("New address created as default address");
        }

        // 2. SetDefaultAddress: Set an address as the default for a user
        [HttpPut(Name ="SetDefaultAddress")]
        public async Task<IActionResult> SetDefaultAddress( int addressId)
        {
            // Find the user and include their addresses
            var user = await _context.Users.Include(u => u.Address)
                                           .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

            if (user == null)
                return NotFound("User not found.");

            var address = user.Address.FirstOrDefault(a => a.Id == addressId);
            if (address == null)
                return NotFound("Address not found.");

            // Remove default flag from all addresses
            foreach (var addr in user.Address)
            {
                addr.IsDefault = false;
            }

            // Set the selected address as default
            address.IsDefault = true;
            await _context.SaveChangesAsync();

            return Ok($"Address with ID {addressId} is now the default address.");
        }

        // 3. DeleteAddress: Delete a specific address
        [HttpDelete(Name ="DeleteAddress")]
        public async Task<IActionResult> DeleteAddress(int addressId)
        {
            // Find the user and include their addresses
            var user = await _context.Users.Include(u => u.Address)
                                           .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

            if (user == null)
                return NotFound("User not found.");

            var address = user.Address.FirstOrDefault(a => a.Id == addressId);
            if (address == null)
                return NotFound("Address not found.");

            // Remove the address
            user.Address.Remove(address);
            _context.UserAddress.Remove(address);
            await _context.SaveChangesAsync();

            // Set another address as default if the deleted one was default
            if (address.IsDefault && user.Address.Any())
            {
                user.Address.First().IsDefault = true;
                await _context.SaveChangesAsync();
            }

            return Ok($"Address with ID {addressId} has been deleted.");
        }

        // 4. GetUserAddresses: Retrieve all addresses for a user
        [HttpGet("GetUserAddresses")]
        public async Task<IActionResult> GetUserAddresses()
        {
            // Find the user and include their addresses
            var user = await _context.Users.Include(u => u.Address)
                .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

            if (user == null)
                return NotFound("User not found.");

            // Map UserAddresses to AddressDto for response
            var addresses = user.Address.Select(address => new AddressDto
            {
                FirstName = address.FirstName,
                LastName = address.LastName,
                Address1 = address.Address1,
                City = address.City,
                Province = address.Province,
                PostalCode = address.PostalCode,
                Country = address.Country,
            }).ToList();

            return Ok(addresses);
        }

        //5. GetDefaultAddress : Retrieve the default address for user
        [HttpGet("GetDefaultAddress")]
        public async Task<IActionResult> GetDefaultAddress()
        {
            // Find the default address from UserAddress
            var defaultAddress = await _context.UserAddress
                .FirstOrDefaultAsync(a=>a.User.UserName == User.Identity.Name && a.IsDefault);
            
            if(defaultAddress == null) return BadRequest("Default Address not found");

            var addressDto = new AddressDto{
                FirstName = defaultAddress.FirstName,
                LastName = defaultAddress.LastName,
                Address1 = defaultAddress.Address1,
                City = defaultAddress.City,
                Province = defaultAddress.Province,
                PostalCode = defaultAddress.PostalCode,
                Country = defaultAddress.Country
            };
            return Ok(addressDto);
            
            
        }
    }
}