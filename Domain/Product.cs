using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        [Key]
        public long ProductID { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double BasePrice { get; set; }
        public int DiscountPercent { get; set; }
        public double DiscountPrice { get; set; }
        public string Description { get; set; }

    }
}
