using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Year = table.Column<string>(type: "TEXT", nullable: true),
                    Course = table.Column<string>(type: "TEXT", nullable: true),
                    Quote = table.Column<string>(type: "TEXT", nullable: true),
                    Gender = table.Column<string>(type: "TEXT", nullable: true),
                    CompanyName = table.Column<string>(type: "TEXT", nullable: true),
                    CompanyAddress = table.Column<string>(type: "TEXT", nullable: true),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Years",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    GraduatedSchoolYear = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Years", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPhotos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPhotos_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BSIT = table.Column<int>(type: "INTEGER", nullable: false),
                    BSCS = table.Column<int>(type: "INTEGER", nullable: false),
                    ACT = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    YearId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Course_Years_YearId",
                        column: x => x.YearId,
                        principalTable: "Years",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EducationalDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    YearId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationalDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducationalDetails_Years_YearId",
                        column: x => x.YearId,
                        principalTable: "Years",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    YearId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Years_YearId",
                        column: x => x.YearId,
                        principalTable: "Years",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FirstJobDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    YearId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FirstJobDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FirstJobDetails_Years_YearId",
                        column: x => x.YearId,
                        principalTable: "Years",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Genders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Male = table.Column<int>(type: "INTEGER", nullable: false),
                    Female = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    YearId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Genders_Years_YearId",
                        column: x => x.YearId,
                        principalTable: "Years",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobPosts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    JobTitle = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    UserPhotoId = table.Column<Guid>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    AppUserId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobPosts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobPosts_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JobPosts_UserPhotos_UserPhotoId",
                        column: x => x.UserPhotoId,
                        principalTable: "UserPhotos",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompentencyLearningInColleges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    CommunicationSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    CriticalThinkingSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    HumanRelationSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    EntrepreneurialSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    ITSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    ProblemSolvingSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    OtherSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompentencyLearningInColleges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompentencyLearningInColleges_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ElectiveSubjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Score1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score5 = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElectiveSubjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ElectiveSubjects_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Geds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Score1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score5 = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Geds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Geds_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ITCertifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Score1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score5 = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ITCertifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ITCertifications_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ojts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Score1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score5 = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ojts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ojts_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PresentJobRelatedCourses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Yes = table.Column<int>(type: "INTEGER", nullable: false),
                    No = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentJobRelatedCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PresentJobRelatedCourses_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProfessionalSubjects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Score1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score5 = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfessionalSubjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProfessionalSubjects_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Seminars",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Score1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Score5 = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seminars", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seminars_EducationalDetails_EducationalDetailId",
                        column: x => x.EducationalDetailId,
                        principalTable: "EducationalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    BPOIndustry = table.Column<int>(type: "INTEGER", nullable: false),
                    EducationalInstitution = table.Column<int>(type: "INTEGER", nullable: false),
                    MultinationalCompany = table.Column<int>(type: "INTEGER", nullable: false),
                    BankingInstitution = table.Column<int>(type: "INTEGER", nullable: false),
                    GovermentOffices = table.Column<int>(type: "INTEGER", nullable: false),
                    PrivateInstitution = table.Column<int>(type: "INTEGER", nullable: false),
                    ITIndustry = table.Column<int>(type: "INTEGER", nullable: false),
                    Insurances = table.Column<int>(type: "INTEGER", nullable: false),
                    CommunicationCompany = table.Column<int>(type: "INTEGER", nullable: false),
                    Other = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyTypes_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployedAfterGraduations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Yes = table.Column<int>(type: "INTEGER", nullable: false),
                    No = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployedAfterGraduations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployedAfterGraduations_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmploymentStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Regular = table.Column<int>(type: "INTEGER", nullable: false),
                    Temporary = table.Column<int>(type: "INTEGER", nullable: false),
                    Casual = table.Column<int>(type: "INTEGER", nullable: false),
                    Contractual = table.Column<int>(type: "INTEGER", nullable: false),
                    PartTime = table.Column<int>(type: "INTEGER", nullable: false),
                    Probitionary = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmploymentStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmploymentStatuses_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobPositions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Managerial = table.Column<int>(type: "INTEGER", nullable: false),
                    Supervisory = table.Column<int>(type: "INTEGER", nullable: false),
                    Clerical = table.Column<int>(type: "INTEGER", nullable: false),
                    SelfEmployed = table.Column<int>(type: "INTEGER", nullable: false),
                    Other = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobPositions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobPositions_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PresentlyEmployeds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Yes = table.Column<int>(type: "INTEGER", nullable: false),
                    No = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PresentlyEmployeds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PresentlyEmployeds_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReasonForUnemployeds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    PursingAdvanceStudies = table.Column<int>(type: "INTEGER", nullable: false),
                    FamilyConcern = table.Column<int>(type: "INTEGER", nullable: false),
                    HealthReason = table.Column<int>(type: "INTEGER", nullable: false),
                    LackOfExp = table.Column<int>(type: "INTEGER", nullable: false),
                    InadeqSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    NoJobOpport = table.Column<int>(type: "INTEGER", nullable: false),
                    DidNotLookForJob = table.Column<int>(type: "INTEGER", nullable: false),
                    LackOfInterest = table.Column<int>(type: "INTEGER", nullable: false),
                    UnsatisfactoryOffer = table.Column<int>(type: "INTEGER", nullable: false),
                    Other = table.Column<int>(type: "INTEGER", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReasonForUnemployeds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReasonForUnemployeds_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CurrentFirstJobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Yes = table.Column<int>(type: "INTEGER", nullable: false),
                    No = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstJobDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentFirstJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrentFirstJobs_FirstJobDetails_FirstJobDetailId",
                        column: x => x.FirstJobDetailId,
                        principalTable: "FirstJobDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DifficultiesEncounterFirstJob",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    NoAvailJob = table.Column<int>(type: "INTEGER", nullable: false),
                    LackOfExp = table.Column<int>(type: "INTEGER", nullable: false),
                    LowCompenOffer = table.Column<int>(type: "INTEGER", nullable: false),
                    LowOpporAdvancement = table.Column<int>(type: "INTEGER", nullable: false),
                    LackOfSkill = table.Column<int>(type: "INTEGER", nullable: false),
                    Other = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstJobDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DifficultiesEncounterFirstJob", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DifficultiesEncounterFirstJob_FirstJobDetails_FirstJobDetailId",
                        column: x => x.FirstJobDetailId,
                        principalTable: "FirstJobDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FindFirstJobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ToAnAdvertisement = table.Column<int>(type: "INTEGER", nullable: false),
                    AsWalkInApplicant = table.Column<int>(type: "INTEGER", nullable: false),
                    RecommendedBySomeone = table.Column<int>(type: "INTEGER", nullable: false),
                    InformationFromFriends = table.Column<int>(type: "INTEGER", nullable: false),
                    ArrangedByTheSchool = table.Column<int>(type: "INTEGER", nullable: false),
                    FamilyBusiness = table.Column<int>(type: "INTEGER", nullable: false),
                    JobFairForPeso = table.Column<int>(type: "INTEGER", nullable: false),
                    Other = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstJobDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FindFirstJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FindFirstJobs_FirstJobDetails_FirstJobDetailId",
                        column: x => x.FirstJobDetailId,
                        principalTable: "FirstJobDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FirstJobRelatedCourses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Yes = table.Column<int>(type: "INTEGER", nullable: false),
                    No = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstJobDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FirstJobRelatedCourses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FirstJobRelatedCourses_FirstJobDetails_FirstJobDetailId",
                        column: x => x.FirstJobDetailId,
                        principalTable: "FirstJobDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LandFirstJobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    LessThanAMonth = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthOneToThree = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthFourToSix = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthSevenToEleven = table.Column<int>(type: "INTEGER", nullable: false),
                    YearOneToTwo = table.Column<int>(type: "INTEGER", nullable: false),
                    YearTwoToThree = table.Column<int>(type: "INTEGER", nullable: false),
                    YearThreeToFour = table.Column<int>(type: "INTEGER", nullable: false),
                    Others = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstJobDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LandFirstJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LandFirstJobs_FirstJobDetails_FirstJobDetailId",
                        column: x => x.FirstJobDetailId,
                        principalTable: "FirstJobDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReasonTakingFirstJobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Salary = table.Column<int>(type: "INTEGER", nullable: false),
                    CareerChallenge = table.Column<int>(type: "INTEGER", nullable: false),
                    RelatedSpecialSkil = table.Column<int>(type: "INTEGER", nullable: false),
                    ProximtyMyResidence = table.Column<int>(type: "INTEGER", nullable: false),
                    Other = table.Column<int>(type: "INTEGER", nullable: false),
                    Total = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstJobDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReasonTakingFirstJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReasonTakingFirstJobs_FirstJobDetails_FirstJobDetailId",
                        column: x => x.FirstJobDetailId,
                        principalTable: "FirstJobDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StayFirstJobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    LessThanAMonth = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthOneToThree = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthFourToSix = table.Column<int>(type: "INTEGER", nullable: false),
                    MonthSevenToEleven = table.Column<int>(type: "INTEGER", nullable: false),
                    YearOneToTwo = table.Column<int>(type: "INTEGER", nullable: false),
                    YearTwoToThree = table.Column<int>(type: "INTEGER", nullable: false),
                    YearThreeToFour = table.Column<int>(type: "INTEGER", nullable: false),
                    Others = table.Column<int>(type: "INTEGER", nullable: false),
                    FirstJobDetailId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StayFirstJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StayFirstJobs_FirstJobDetails_FirstJobDetailId",
                        column: x => x.FirstJobDetailId,
                        principalTable: "FirstJobDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    JobPostId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobFiles_JobPosts_JobPostId",
                        column: x => x.JobPostId,
                        principalTable: "JobPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyTypes_EmployeeId",
                table: "CompanyTypes",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompentencyLearningInColleges_EducationalDetailId",
                table: "CompentencyLearningInColleges",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Course_YearId",
                table: "Course",
                column: "YearId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CurrentFirstJobs_FirstJobDetailId",
                table: "CurrentFirstJobs",
                column: "FirstJobDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DifficultiesEncounterFirstJob_FirstJobDetailId",
                table: "DifficultiesEncounterFirstJob",
                column: "FirstJobDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EducationalDetails_YearId",
                table: "EducationalDetails",
                column: "YearId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ElectiveSubjects_EducationalDetailId",
                table: "ElectiveSubjects",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployedAfterGraduations_EmployeeId",
                table: "EmployedAfterGraduations",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_YearId",
                table: "Employees",
                column: "YearId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmploymentStatuses_EmployeeId",
                table: "EmploymentStatuses",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FindFirstJobs_FirstJobDetailId",
                table: "FindFirstJobs",
                column: "FirstJobDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FirstJobDetails_YearId",
                table: "FirstJobDetails",
                column: "YearId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FirstJobRelatedCourses_FirstJobDetailId",
                table: "FirstJobRelatedCourses",
                column: "FirstJobDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Geds_EducationalDetailId",
                table: "Geds",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Genders_YearId",
                table: "Genders",
                column: "YearId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ITCertifications_EducationalDetailId",
                table: "ITCertifications",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobFiles_JobPostId",
                table: "JobFiles",
                column: "JobPostId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobPositions_EmployeeId",
                table: "JobPositions",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobPosts_AppUserId",
                table: "JobPosts",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_JobPosts_UserPhotoId",
                table: "JobPosts",
                column: "UserPhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_LandFirstJobs_FirstJobDetailId",
                table: "LandFirstJobs",
                column: "FirstJobDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ojts_EducationalDetailId",
                table: "Ojts",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PresentJobRelatedCourses_EducationalDetailId",
                table: "PresentJobRelatedCourses",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PresentlyEmployeds_EmployeeId",
                table: "PresentlyEmployeds",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProfessionalSubjects_EducationalDetailId",
                table: "ProfessionalSubjects",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReasonForUnemployeds_EmployeeId",
                table: "ReasonForUnemployeds",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReasonTakingFirstJobs_FirstJobDetailId",
                table: "ReasonTakingFirstJobs",
                column: "FirstJobDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Seminars_EducationalDetailId",
                table: "Seminars",
                column: "EducationalDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StayFirstJobs_FirstJobDetailId",
                table: "StayFirstJobs",
                column: "FirstJobDetailId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserPhotos_AppUserId",
                table: "UserPhotos",
                column: "AppUserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "CompanyTypes");

            migrationBuilder.DropTable(
                name: "CompentencyLearningInColleges");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropTable(
                name: "CurrentFirstJobs");

            migrationBuilder.DropTable(
                name: "DifficultiesEncounterFirstJob");

            migrationBuilder.DropTable(
                name: "ElectiveSubjects");

            migrationBuilder.DropTable(
                name: "EmployedAfterGraduations");

            migrationBuilder.DropTable(
                name: "EmploymentStatuses");

            migrationBuilder.DropTable(
                name: "FindFirstJobs");

            migrationBuilder.DropTable(
                name: "FirstJobRelatedCourses");

            migrationBuilder.DropTable(
                name: "Geds");

            migrationBuilder.DropTable(
                name: "Genders");

            migrationBuilder.DropTable(
                name: "ITCertifications");

            migrationBuilder.DropTable(
                name: "JobFiles");

            migrationBuilder.DropTable(
                name: "JobPositions");

            migrationBuilder.DropTable(
                name: "LandFirstJobs");

            migrationBuilder.DropTable(
                name: "Ojts");

            migrationBuilder.DropTable(
                name: "PresentJobRelatedCourses");

            migrationBuilder.DropTable(
                name: "PresentlyEmployeds");

            migrationBuilder.DropTable(
                name: "ProfessionalSubjects");

            migrationBuilder.DropTable(
                name: "ReasonForUnemployeds");

            migrationBuilder.DropTable(
                name: "ReasonTakingFirstJobs");

            migrationBuilder.DropTable(
                name: "Seminars");

            migrationBuilder.DropTable(
                name: "StayFirstJobs");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "JobPosts");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "EducationalDetails");

            migrationBuilder.DropTable(
                name: "FirstJobDetails");

            migrationBuilder.DropTable(
                name: "UserPhotos");

            migrationBuilder.DropTable(
                name: "Years");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
