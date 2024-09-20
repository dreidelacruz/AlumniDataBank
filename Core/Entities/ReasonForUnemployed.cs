using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ReasonForUnemployed : BaseEntity
    {
        public int PursingAdvanceStudies { get; set; }
        public int FamilyConcern { get; set; }
        public int HealthReason { get; set; }
        public int LackOfExp { get; set; }
        public int InadeqSkill { get; set; }
        public int NoJobOpport { get; set; }
        public int DidNotLookForJob { get; set; }
        public int LackOfInterest { get; set; }
        public int UnsatisfactoryOffer { get; set; }
        public int Other { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
    }
}