namespace Core.Entities
{
    public class Year  : BaseEntity
    {
        public string GraduatedSchoolYear { get; set; }
        public Course Course { get; set; }
        public Gender Gender { get; set; }
        public Employee Employee { get; set; }
        public FirstJobDetail FirstJobDetail { get; set; }
        public EducationalDetail EducationalDetail { get; set; }
    }
}