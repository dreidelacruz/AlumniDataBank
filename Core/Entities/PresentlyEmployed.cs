using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class PresentlyEmployed : BaseEntity
    {
        public int Yes { get; set; }
        public int No { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
    }
}