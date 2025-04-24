using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public bool InStock { get; set; }
        public string Name { get; set; }
    }
}
