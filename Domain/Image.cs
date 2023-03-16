using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Image
    {
        [Key]
        public int ImageID { get; set; }
        public string ImageName { get; set; }
        
        [ForeignKey("ProductID")]
        public long ProductID { get; set; }
    }
}
