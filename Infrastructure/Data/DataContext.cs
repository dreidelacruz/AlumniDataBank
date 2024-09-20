using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContext 
        : IdentityDbContext<AppUser, AppRole, string,
        IdentityUserClaim<string>, AppUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public DbSet<CompentencyLearningInCollege> CompentencyLearningInColleges { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CurrentFirstJob> CurrentFirstJobs { get; set; }
        public DbSet<DifficultiesEncounterFirstJob> DifficultiesEncounterFirstJob { get; set; }
        public DbSet<EducationalDetail> EducationalDetails { get; set; }
        public DbSet<ElectiveSubject> ElectiveSubjects { get; set; }
        public DbSet<EmployedAfterGraduation> EmployedAfterGraduations { get; set; }
        public DbSet<EmploymentStatus> EmploymentStatuses { get; set; }
        public DbSet<FindFirstJob> FindFirstJobs { get; set; }
        public DbSet<FirstJobDetail> FirstJobDetails { get; set; }
        public DbSet<FirstJobRelatedCourse> FirstJobRelatedCourses { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<ITCertification> ITCertifications { get; set; }
        public DbSet<JobPosition> JobPositions { get; set; }
        public DbSet<LandFirstJob> LandFirstJobs { get; set; }
        public DbSet<Ojt> Ojts { get; set; }
        public DbSet<PresentJobRelatedCourse> PresentJobRelatedCourses { get; set; }
        public DbSet<PresentlyEmployed> PresentlyEmployeds { get; set; }
        public DbSet<ProfessionalSubject> ProfessionalSubjects { get; set; }
        public DbSet<ReasonForUnemployed> ReasonForUnemployeds { get; set; }
        public DbSet<ReasonTakingFirstJob> ReasonTakingFirstJobs { get; set; }
        public DbSet<Seminar> Seminars { get; set; }
        public DbSet<StayFirstJob> StayFirstJobs { get; set; }
        public DbSet<Year> Years { get; set; }
        public DbSet<Course> GraduatedCourses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<CompanyType> CompanyTypes { get; set; }
        public DbSet<Ged> Geds { get; set; }
        public DbSet<JobPost> JobPosts { get; set; }
        public DbSet<JobFile> JobFiles { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        public DbSet<ProofPhoto> ProofPhotos { get; set; }
        
        public DataContext(DbContextOptions<DataContext> options) : base
        (options)
        {}

        protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            foreach (var property in modelBuilder.Model.GetEntityTypes()
                        .SelectMany(t => t.GetProperties())
                        .Where
                        ( p
                        => p.ClrType == typeof(DateTime) 
                            || p.ClrType == typeof(DateTime?)
                        )
                )
                {
                    property.SetColumnType("timestamp without time zone");
                }

            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();


            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
  
        }
    }
}