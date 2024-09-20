using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class JobToReturn
    {
        public Guid Id { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
    }
}