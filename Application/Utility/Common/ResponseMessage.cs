using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utility.Common
{
    public class ResponseMessage
    {
        public object ResponseObj { get; set; }
        public string Message { get; set; }
        public int ResponseCode { get; set; }
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}
