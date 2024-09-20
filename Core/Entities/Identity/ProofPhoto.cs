using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities.Identity
{
    public class ProofPhoto : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }

        public ProofPhoto(){}
        
        public ProofPhoto(string url)
        {
            Url = url;
        }
    }
}