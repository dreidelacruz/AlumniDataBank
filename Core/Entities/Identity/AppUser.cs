using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public UserPhoto UserPhoto { get; set; }
        public ProofPhoto ProofPhoto { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<JobPost> JobPosts { get; set; }
        public string Year { get; set; }
        public string Course { get; set; }
        public string Quote { get; set; }
        public string Gender { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
    }
}