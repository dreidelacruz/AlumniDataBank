using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CompentencyLearningInCollege : BaseEntity
    {
        public int CommunicationSkill { get; set; }
        public int CriticalThinkingSkill { get; set; }
        public int HumanRelationSkill { get; set; }
        public int EntrepreneurialSkill { get; set; }
        public int ITSkill { get; set; }
        public int ProblemSolvingSkill { get; set; }
        public int OtherSkill { get; set; }
        [JsonIgnore]
        public EducationalDetail EducationalDetail { get; set; }
        public Guid EducationalDetailId { get; set; }
    }
}