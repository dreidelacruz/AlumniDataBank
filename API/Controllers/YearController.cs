using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Dtos.Course;
using AutoMapper;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class YearController : BaseApiController
    {
        public YearController(DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
        }

        [HttpGet]
        public async Task<ActionResult<List<Year>>> GetAllYear()
        {
            var year = await _dataContext.Years
                                    .Include(b => b.Course)
                                    .Include(b => b.Gender)
                                    .Include(b => b.Employee)
                                    .ThenInclude(p => p.PresentlyEmployed)
                                    .Include(b => b.Employee)
                                    .ThenInclude(p => p.CompanyType)
                                    .Include(b => b.Employee)
                                    .ThenInclude(p => p.JobPosition)
                                    .Include(b => b.Employee)
                                    .ThenInclude(p => p.EmploymentStatus)
                                    .Include(b => b.Employee)
                                    .ThenInclude(p => p.EmployedAfterGraduation)
                                    .Include(b => b.Employee)
                                    .ThenInclude(p => p.ReasonForUnemployed)
                                    .Include(b => b.FirstJobDetail)
                                    .ThenInclude(f => f.FirstJobRelatedCourse)
                                    .Include(b => b.FirstJobDetail)
                                    .ThenInclude(f => f.LandFirstJob)
                                    .Include(b => b.FirstJobDetail)
                                    .ThenInclude(f => f.FindFirstJob)
                                    .Include(b => b.FirstJobDetail)
                                    .ThenInclude(f => f.DifficultiesEncounterFirstJob)
                                    .Include(b => b.FirstJobDetail)
                                    .ThenInclude(f => f.CurrentFirstJob)
                                    .Include(b => b.FirstJobDetail)
                                    .ThenInclude(f => f.StayFirstJob)
                                    .Include(b => b.FirstJobDetail)
                                    .ThenInclude(f => f.ReasonTakingFirstJob)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.PresentJobRelatedCourse)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.CompentencyLearningInCollege)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.Ged)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.ProfessionalSubject)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.ElectiveSubject)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.ITCertification)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.Seminar)
                                    .Include(b => b.EducationalDetail)
                                    .ThenInclude(p => p.Ojt)
                                    .ToListAsync();
            return Ok(year);
        }

        [HttpPut("gender/female/{id}")]
        public async Task<ActionResult> CreateGenderFemale(
           Guid id)
        {
            var female = await _dataContext.Genders.FindAsync(id);
            if(female == null) return BadRequest();
            female.Female += 1;
            _dataContext.Genders.Update(female);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("gender/male/{id}")]
        public async Task<ActionResult> CreateGenderMale(
           Guid id)
        {
            var male = await _dataContext.Genders.FindAsync(id);
            if(male == null) return BadRequest();
            male.Male += 1;
            _dataContext.Genders.Update(male);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("gender/total/{id}")]
        public async Task<ActionResult> GenderTotal(
           Guid id)
        {
            var total = await _dataContext.Genders
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Female + x.Male);
            return Ok(total);
        }

        
        //* =====Course=====
        [HttpPut("course/bsit/{id}")]
        public async Task<ActionResult> CreateBSIT(
           Guid id)
        {
            var findBSIT = await _dataContext.Courses.FindAsync(id);
            if(findBSIT == null) return BadRequest();
            findBSIT.BSIT += 1;
            _dataContext.Courses.Update(findBSIT);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("course/bscs/{id}")]
        public async Task<ActionResult> CreateBSCS(
           Guid id)
        {
            var findBSCS = await _dataContext.Courses.FindAsync(id);
            if(findBSCS == null) return BadRequest();
            findBSCS.BSCS += 1;
            _dataContext.Courses.Update(findBSCS);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("course/act/{id}")]
        public async Task<ActionResult> CreateACT(
           Guid id)
        {
            var findACT = await _dataContext.Courses.FindAsync(id);
            if(findACT == null) return BadRequest();
            findACT.ACT += 1;
            _dataContext.Courses.Update(findACT);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteYear(
           Guid id)
        {
            var year = await _dataContext.Years.FindAsync(id);
            if(year == null) return BadRequest();
            _dataContext.Years.Remove(year);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("course/total/{id}")]
        public async Task<ActionResult> CourseTotal(
           Guid id)
        {
            var total = await _dataContext.Courses
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.ACT + x.BSCS + x.BSIT);
            return Ok(total);
        }

        [HttpPost]
        public async Task<ActionResult<CreateYearDto>> CreateYear(CreateYearDto
         yearDto)
        {
            var year = _mapper.Map<CreateYearDto, 
                            Year>(yearDto);

            year.Course = new Course();
            year.Course.BSIT = 0;
            year.Course.BSCS = 0;
            year.Course.ACT = 0;

            year.Gender = new Gender();
            year.Gender.Male = 0;
            year.Gender.Female = 0;
            year.Gender.Total = 0;

            year.Employee = new Employee();
            year.Employee.PresentlyEmployed = new PresentlyEmployed();
            year.Employee.PresentlyEmployed.Yes = 0;
            year.Employee.PresentlyEmployed.No = 0;
            year.Employee.PresentlyEmployed.Total = 0;

            year.Employee.CompanyType = new CompanyType();
            year.Employee.CompanyType.BPOIndustry = 0;
            year.Employee.CompanyType.EducationalInstitution = 0;
            year.Employee.CompanyType.MultinationalCompany = 0;
            year.Employee.CompanyType.BankingInstitution = 0;
            year.Employee.CompanyType.GovermentOffices = 0;
            year.Employee.CompanyType.PrivateInstitution = 0;
            year.Employee.CompanyType.ITIndustry = 0;
            year.Employee.CompanyType.Insurances = 0;
            year.Employee.CompanyType.CommunicationCompany = 0;
            year.Employee.CompanyType.Other = 0;
            year.Employee.CompanyType.Total = 0;

            year.Employee.JobPosition = new JobPosition();
            year.Employee.JobPosition.Managerial = 0;
            year.Employee.JobPosition.Supervisory = 0;
            year.Employee.JobPosition.Clerical = 0;
            year.Employee.JobPosition.SelfEmployed = 0;
            year.Employee.JobPosition.Other = 0;
            year.Employee.JobPosition.Total = 0;

            year.Employee.EmploymentStatus = new EmploymentStatus();
            year.Employee.EmploymentStatus.Regular = 0;
            year.Employee.EmploymentStatus.Temporary = 0;
            year.Employee.EmploymentStatus.Casual = 0;
            year.Employee.EmploymentStatus.Contractual = 0;
            year.Employee.EmploymentStatus.PartTime = 0;
            year.Employee.EmploymentStatus.Probitionary = 0;
            year.Employee.EmploymentStatus.Total = 0;

            year.Employee.EmployedAfterGraduation = new EmployedAfterGraduation();
            year.Employee.EmployedAfterGraduation.Yes = 0;
            year.Employee.EmployedAfterGraduation.No = 0;
            year.Employee.EmployedAfterGraduation.Total = 0;

            year.Employee.ReasonForUnemployed = new ReasonForUnemployed();
            year.Employee.ReasonForUnemployed.PursingAdvanceStudies = 0;
            year.Employee.ReasonForUnemployed.FamilyConcern = 0;
            year.Employee.ReasonForUnemployed.HealthReason = 0;
            year.Employee.ReasonForUnemployed.LackOfExp = 0;
            year.Employee.ReasonForUnemployed.LackOfInterest = 0;
            year.Employee.ReasonForUnemployed.InadeqSkill = 0;
            year.Employee.ReasonForUnemployed.NoJobOpport = 0;
            year.Employee.ReasonForUnemployed.DidNotLookForJob = 0;
            year.Employee.ReasonForUnemployed.UnsatisfactoryOffer = 0;
            year.Employee.ReasonForUnemployed.Other = 0;
            
            year.FirstJobDetail = new FirstJobDetail();
            year.FirstJobDetail.FirstJobRelatedCourse = new FirstJobRelatedCourse();
            year.FirstJobDetail.FirstJobRelatedCourse.Yes = 0;
            year.FirstJobDetail.FirstJobRelatedCourse.No = 0;
            year.FirstJobDetail.FirstJobRelatedCourse.Total = 0;

            year.FirstJobDetail.LandFirstJob = new LandFirstJob();
            year.FirstJobDetail.LandFirstJob.LessThanAMonth = 0;
            year.FirstJobDetail.LandFirstJob.MonthOneToThree = 0;
            year.FirstJobDetail.LandFirstJob.MonthFourToSix = 0;
            year.FirstJobDetail.LandFirstJob.MonthSevenToEleven = 0;
            year.FirstJobDetail.LandFirstJob.YearOneToTwo = 0;
            year.FirstJobDetail.LandFirstJob.YearTwoToThree = 0;
            year.FirstJobDetail.LandFirstJob.YearThreeToFour = 0;
            year.FirstJobDetail.LandFirstJob.Others = 0;

            year.FirstJobDetail.FindFirstJob = new FindFirstJob();
            year.FirstJobDetail.FindFirstJob.ToAnAdvertisement = 0;
            year.FirstJobDetail.FindFirstJob.AsWalkInApplicant = 0;
            year.FirstJobDetail.FindFirstJob.RecommendedBySomeone = 0;
            year.FirstJobDetail.FindFirstJob.InformationFromFriends = 0;
            year.FirstJobDetail.FindFirstJob.ArrangedByTheSchool = 0;
            year.FirstJobDetail.FindFirstJob.FamilyBusiness = 0;
            year.FirstJobDetail.FindFirstJob.JobFairForPeso = 0;
            year.FirstJobDetail.FindFirstJob.Other = 0;
            year.FirstJobDetail.FindFirstJob.Total = 0;

            year.FirstJobDetail.DifficultiesEncounterFirstJob = new DifficultiesEncounterFirstJob();
            year.FirstJobDetail.DifficultiesEncounterFirstJob.NoAvailJob = 0;
            year.FirstJobDetail.DifficultiesEncounterFirstJob.LackOfExp = 0;
            year.FirstJobDetail.DifficultiesEncounterFirstJob.LowCompenOffer = 0;
            year.FirstJobDetail.DifficultiesEncounterFirstJob.LowOpporAdvancement = 0;
            year.FirstJobDetail.DifficultiesEncounterFirstJob.LackOfSkill = 0;
            year.FirstJobDetail.DifficultiesEncounterFirstJob.Other = 0;
            year.FirstJobDetail.DifficultiesEncounterFirstJob.Total = 0;
            
            year.FirstJobDetail.CurrentFirstJob = new CurrentFirstJob();
            year.FirstJobDetail.CurrentFirstJob.Yes = 0;
            year.FirstJobDetail.CurrentFirstJob.No = 0;
            year.FirstJobDetail.CurrentFirstJob.Total = 0;

            year.FirstJobDetail.StayFirstJob = new StayFirstJob();
            year.FirstJobDetail.StayFirstJob.LessThanAMonth = 0;
            year.FirstJobDetail.StayFirstJob.MonthOneToThree = 0;
            year.FirstJobDetail.StayFirstJob.MonthFourToSix = 0;
            year.FirstJobDetail.StayFirstJob.MonthSevenToEleven = 0;
            year.FirstJobDetail.StayFirstJob.YearOneToTwo = 0;
            year.FirstJobDetail.StayFirstJob.YearTwoToThree = 0;
            year.FirstJobDetail.StayFirstJob.YearThreeToFour = 0;
            year.FirstJobDetail.StayFirstJob.Others = 0;

            year.FirstJobDetail.ReasonTakingFirstJob = new ReasonTakingFirstJob();
            year.FirstJobDetail.ReasonTakingFirstJob.Salary = 0;
            year.FirstJobDetail.ReasonTakingFirstJob.CareerChallenge = 0;
            year.FirstJobDetail.ReasonTakingFirstJob.RelatedSpecialSkil = 0;
            year.FirstJobDetail.ReasonTakingFirstJob.ProximtyMyResidence = 0;
            year.FirstJobDetail.ReasonTakingFirstJob.Other = 0;
            year.FirstJobDetail.ReasonTakingFirstJob.Total = 0;

            year.EducationalDetail = new EducationalDetail();
            year.EducationalDetail.PresentJobRelatedCourse = new PresentJobRelatedCourse();
            year.EducationalDetail.PresentJobRelatedCourse.Yes = 0;
            year.EducationalDetail.PresentJobRelatedCourse.No = 0;
            year.EducationalDetail.PresentJobRelatedCourse.Total = 0;

            year.EducationalDetail.CompentencyLearningInCollege = new CompentencyLearningInCollege();
            year.EducationalDetail.CompentencyLearningInCollege.CommunicationSkill = 0;
            year.EducationalDetail.CompentencyLearningInCollege.CriticalThinkingSkill = 0;
            year.EducationalDetail.CompentencyLearningInCollege.HumanRelationSkill = 0;
            year.EducationalDetail.CompentencyLearningInCollege.EntrepreneurialSkill = 0;
            year.EducationalDetail.CompentencyLearningInCollege.ITSkill = 0;
            year.EducationalDetail.CompentencyLearningInCollege.ProblemSolvingSkill = 0;
            year.EducationalDetail.CompentencyLearningInCollege.OtherSkill= 0;

            year.EducationalDetail.Ged = new Ged();
            year.EducationalDetail.Ged.Score1 = 0;
            year.EducationalDetail.Ged.Score2 = 0;
            year.EducationalDetail.Ged.Score3 = 0;
            year.EducationalDetail.Ged.Score4 = 0;
            year.EducationalDetail.Ged.Score5 = 0;

            year.EducationalDetail.ProfessionalSubject = new ProfessionalSubject();
            year.EducationalDetail.ProfessionalSubject.Score1 = 0;
            year.EducationalDetail.ProfessionalSubject.Score2 = 0;
            year.EducationalDetail.ProfessionalSubject.Score3 = 0;
            year.EducationalDetail.ProfessionalSubject.Score4 = 0;
            year.EducationalDetail.ProfessionalSubject.Score5 = 0;

            year.EducationalDetail.ElectiveSubject = new ElectiveSubject();
            year.EducationalDetail.ElectiveSubject.Score1 = 0;
            year.EducationalDetail.ElectiveSubject.Score2 = 0;
            year.EducationalDetail.ElectiveSubject.Score3 = 0;
            year.EducationalDetail.ElectiveSubject.Score4 = 0;
            year.EducationalDetail.ElectiveSubject.Score5 = 0;

            year.EducationalDetail.ITCertification = new ITCertification();
            year.EducationalDetail.ITCertification.Score1 = 0;
            year.EducationalDetail.ITCertification.Score2 = 0;
            year.EducationalDetail.ITCertification.Score3 = 0;
            year.EducationalDetail.ITCertification.Score4 = 0;
            year.EducationalDetail.ITCertification.Score5 = 0;

            year.EducationalDetail.Seminar = new Seminar();
            year.EducationalDetail.Seminar.Score1 = 0;
            year.EducationalDetail.Seminar.Score2 = 0;
            year.EducationalDetail.Seminar.Score3 = 0;
            year.EducationalDetail.Seminar.Score4 = 0;
            year.EducationalDetail.Seminar.Score5 = 0;

            year.EducationalDetail.Ojt= new Ojt();
            year.EducationalDetail.Ojt.Score1 = 0;
            year.EducationalDetail.Ojt.Score2 = 0;
            year.EducationalDetail.Ojt.Score3 = 0;
            year.EducationalDetail.Ojt.Score4 = 0;
            year.EducationalDetail.Ojt.Score5 = 0;

            _dataContext.Years.Add(year);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}