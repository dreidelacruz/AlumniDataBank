using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class FirstJobRelatedCourse : BaseEntity
    {
        public int Yes { get; set; }
        public int No { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public FirstJobDetail FirstJobDetail { get; set; }
        public Guid FirstJobDetailId { get; set; }
    }
}