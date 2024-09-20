using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class PresentJobRelatedCourse : BaseEntity
    {
        public int Yes { get; set; }
        public int No { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public EducationalDetail EducationalDetail { get; set; }
        public Guid EducationalDetailId { get; set; }
    }
}