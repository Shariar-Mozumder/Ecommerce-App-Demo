using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utility.Common
{
    public class RequestMessage
    {
        public object RequestObj { get; set; }
        //Pagination
        public int CurrentPage { get; set; } = 1;
        public int ItemPerPage { get; set; } = 15;
    }
}
