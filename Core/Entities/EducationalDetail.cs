using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class EducationalDetail : BaseEntity
    {
        public PresentJobRelatedCourse PresentJobRelatedCourse { get; set; }
        public CompentencyLearningInCollege CompentencyLearningInCollege { get; set; }
        public Ged Ged { get; set; }
        public ProfessionalSubject ProfessionalSubject { get; set; }
        public ElectiveSubject ElectiveSubject { get; set; }
        public ITCertification ITCertification { get; set; }
        public Seminar Seminar { get; set; }
        public Ojt Ojt { get; set; }
        [JsonIgnore]
        public Year Year { get; set; }
        public Guid YearId { get; set; }
    }
}