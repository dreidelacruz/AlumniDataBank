using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class FindFirstJob : BaseEntity
    {
        public int ToAnAdvertisement { get; set; }
        public int AsWalkInApplicant { get; set; }
        public int RecommendedBySomeone { get; set; }
        public int InformationFromFriends { get; set; }
        public int ArrangedByTheSchool { get; set; }
        public int FamilyBusiness { get; set; }
        public int JobFairForPeso { get; set; }
        public int Other { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public FirstJobDetail FirstJobDetail { get; set; }
        public Guid FirstJobDetailId { get; set; }
    }
}