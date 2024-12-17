using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId){
            return query.Include(i=>i.Items)
            .ThenInclude(p=>p.Product)
            .Where(b=>b.BuyerId == buyerId);
        }
    }
}