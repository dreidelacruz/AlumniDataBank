using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities.Identity
{
    public class JobPost : BaseEntity
    {
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public UserPhoto UserPhoto { get; set; }
        public JobFile JobFile { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
    }
}