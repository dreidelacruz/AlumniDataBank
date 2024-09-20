using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace API.Dtos
{
    public class UserDto
    {
   public string Id { get; set; }
        public string UserPhoto { get; set; }
        public string ProofPhoto { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public IEnumerable<JobPost> JobPosts { get; set; }
        public string Year { get; set; }
        public string Course { get; set; }
        public string Quote { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        [JsonIgnore]
        public DateTime Created { get; set; }
        public string CreatedAt { 
            get{
                return Created.ToString("MM/dd/yyyy hh:mm:tt");
            }
            set{}
        }
    }
}