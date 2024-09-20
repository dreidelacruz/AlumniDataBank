using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class FirstJobDetail : BaseEntity
    {
        public FirstJobRelatedCourse FirstJobRelatedCourse { get; set; }
        public LandFirstJob LandFirstJob { get; set; }
        public FindFirstJob FindFirstJob { get; set; }
        public DifficultiesEncounterFirstJob DifficultiesEncounterFirstJob { get; set; }
        public CurrentFirstJob CurrentFirstJob { get; set; }
        public StayFirstJob StayFirstJob { get; set; }
        public ReasonTakingFirstJob ReasonTakingFirstJob { get; set; }
        [JsonIgnore]
        public Year Year { get; set; }
        public Guid YearId { get; set; }
    }
}