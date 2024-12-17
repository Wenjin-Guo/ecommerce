using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Basketitems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        //Navigation prop
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; } = null!;
        public bool IsSelected { get; set; }
    }
}