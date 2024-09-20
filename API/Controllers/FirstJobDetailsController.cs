using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FirstJobDetailsController : BaseApiController
    {
        public FirstJobDetailsController(DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
        }

        [HttpPut("firstjob-related-course/yes/{id}")]
        public async Task<ActionResult> CreateFirstJobRelatedCourseYes(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FirstJobRelatedCourses.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Yes += 1;
            _dataContext.FirstJobRelatedCourses.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("firstjob-related-course/no/{id}")]
        public async Task<ActionResult> CreateFirstJobRelatedCourseNo(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FirstJobRelatedCourses.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.No += 1;
            _dataContext.FirstJobRelatedCourses.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("firstjob-related-course/total")]
        public async Task<ActionResult> FirstjobRelatedCourseTotal(
           Guid id)
        {
            var total = await _dataContext.FirstJobRelatedCourses
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Yes 
                                        + x.No);
            return Ok(total);
        }

        [HttpPut("landfirstjob/less-than-a-month/{id}")]
        public async Task<ActionResult> CreateLessthanAMonthLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.LessThanAMonth += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("landfirstjob/1-3months/{id}")]
        public async Task<ActionResult> Create1To3MonthLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.MonthOneToThree += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("landfirstjob/4-6months/{id}")]
        public async Task<ActionResult> Create4To6MonthLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.MonthFourToSix += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("landfirstjob/7-11months/{id}")]
        public async Task<ActionResult> Create7To11MonthLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.MonthSevenToEleven += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("landfirstjob/1-2years/{id}")]
        public async Task<ActionResult> Create1To2YearLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.YearOneToTwo += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("landfirstjob/2-3years/{id}")]
        public async Task<ActionResult> Create2To3YearLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.YearTwoToThree += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("landfirstjob/3-4years/{id}")]
        public async Task<ActionResult> Create3To4YearLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.YearThreeToFour += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("landfirstjob/other/{id}")]
        public async Task<ActionResult> CreateOtherLandFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.LandFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Others += 1;
            _dataContext.LandFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/to-an-advertisement/{id}")]
        public async Task<ActionResult> CreateToAnAdvertisement(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.ToAnAdvertisement += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/as-walk-in-applicant/{id}")]
        public async Task<ActionResult> CreateAsWalkInApplicant(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.AsWalkInApplicant += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/recommended-by-someone/{id}")]
        public async Task<ActionResult> CreateRecommendedBySomeone(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.RecommendedBySomeone += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/information-from-friends/{id}")]
        public async Task<ActionResult> CreateInformationFromFriends(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.InformationFromFriends += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/arrange-by-the-school/{id}")]
        public async Task<ActionResult> CreateArrangeByTheSchool(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.ArrangedByTheSchool += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/family-business/{id}")]
        public async Task<ActionResult> CreateFamilyBusiness(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.FamilyBusiness += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/job-fair-for-peso/{id}")]
        public async Task<ActionResult> CreateJobFairForPeso(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.JobFairForPeso += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("findfirstjob/other/{id}")]
        public async Task<ActionResult> CreateOtherFindFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.FindFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Other += 1;
            _dataContext.FindFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("findfirstjob/total")]
        public async Task<ActionResult> FindFirstjobTotal(
           Guid id)
        {
            var total = await _dataContext.FindFirstJobs
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.ToAnAdvertisement 
                                        + x.AsWalkInApplicant
                                        + x.RecommendedBySomeone
                                        + x.InformationFromFriends
                                        + x.ArrangedByTheSchool
                                        + x.FamilyBusiness
                                        + x.JobFairForPeso
                                        + x.Other);
            return Ok(total);
        }

        [HttpPut("difficulties-encounter-firstjob/no-avail-job/{id}")]
        public async Task<ActionResult> CreateNoAvailJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.DifficultiesEncounterFirstJob.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.NoAvailJob += 1;
            _dataContext.DifficultiesEncounterFirstJob.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("difficulties-encounter-firstjob/lack-of-exp/{id}")]
        public async Task<ActionResult> CreateLackOfExp(
           Guid id)
        {

            var firstJobDetails = await _dataContext.DifficultiesEncounterFirstJob.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.LackOfExp += 1;
            _dataContext.DifficultiesEncounterFirstJob.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("difficulties-encounter-firstjob/low-compensation-offer/{id}")]
        public async Task<ActionResult> CreateLowCompensationOffer(
           Guid id)
        {

            var firstJobDetails = await _dataContext.DifficultiesEncounterFirstJob.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.LowCompenOffer += 1;
            _dataContext.DifficultiesEncounterFirstJob.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("difficulties-encounter-firstjob/low-opp-advancement/{id}")]
        public async Task<ActionResult> CreateLowOppAdvancement(
           Guid id)
        {

            var firstJobDetails = await _dataContext.DifficultiesEncounterFirstJob.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.LowOpporAdvancement += 1;
            _dataContext.DifficultiesEncounterFirstJob.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("difficulties-encounter-firstjob/lack-of-skill/{id}")]
        public async Task<ActionResult> CreateLackOfSkill(
           Guid id)
        {

            var firstJobDetails = await _dataContext.DifficultiesEncounterFirstJob.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.LackOfSkill += 1;
            _dataContext.DifficultiesEncounterFirstJob.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("difficulties-encounter-firstjob/other/{id}")]
        public async Task<ActionResult> CreateDifficultiesOther(
           Guid id)
        {

            var firstJobDetails = await _dataContext.DifficultiesEncounterFirstJob.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Other += 1;
            _dataContext.DifficultiesEncounterFirstJob.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }


        [HttpGet("difficulties-encounter-firstjob/total")]
        public async Task<ActionResult> DifficultiesEncounterFirstjobTotal(
           Guid id)
        {
            var total = await _dataContext.DifficultiesEncounterFirstJob
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.NoAvailJob
                                        + x.LackOfExp
                                        + x.LowCompenOffer
                                        + x.LowOpporAdvancement
                                        + x.LackOfSkill
                                        + x.Other);
            return Ok(total);
        }

        [HttpPut("current-first-job/yes/{id}")]
        public async Task<ActionResult> CreateCurrentFirstJobYes(
           Guid id)
        {

            var firstJobDetails = await _dataContext.CurrentFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Yes += 1;
            _dataContext.CurrentFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("current-first-job/no/{id}")]
        public async Task<ActionResult> CreateCurrentFirstJobNo(
           Guid id)
        {

            var firstJobDetails = await _dataContext.CurrentFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.No += 1;
            _dataContext.CurrentFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("current-first-job/total")]
        public async Task<ActionResult> CurrentFirstJobTotal(
           Guid id)
        {
            var total = await _dataContext.CurrentFirstJobs
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Yes
                                        + x.No);
            return Ok(total);
        }

        [HttpPut("stay-firstjob/less-than-a-month/{id}")]
        public async Task<ActionResult> CreateLessthanAMonthStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.LessThanAMonth += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("stay-firstjob/1-3months/{id}")]
        public async Task<ActionResult> Create1To3MonthStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.MonthOneToThree += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("stay-firstjob/4-6months/{id}")]
        public async Task<ActionResult> Create4To6MonthStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.MonthFourToSix += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("stay-firstjob/7-11months/{id}")]
        public async Task<ActionResult> Create7To11MonthStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.MonthSevenToEleven += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("stay-firstjob/1-2years/{id}")]
        public async Task<ActionResult> Create1To2YearStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.YearOneToTwo += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("stay-firstjob/2-3years/{id}")]
        public async Task<ActionResult> Create2To3YearStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.YearTwoToThree += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("stay-firstjob/3-4years/{id}")]
        public async Task<ActionResult> Create3To4YearStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.YearThreeToFour += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("stay-firstjob/other/{id}")]
        public async Task<ActionResult> CreateOtherStayFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.StayFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Others += 1;
            _dataContext.StayFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-taking-first-job/salary/{id}")]
        public async Task<ActionResult> CreateReasonForTakingFirstJob(
           Guid id)
        {

            var firstJobDetails = await _dataContext.ReasonTakingFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Salary += 1;
            _dataContext.ReasonTakingFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-taking-first-job/career-challenge/{id}")]
        public async Task<ActionResult> CreateCareerChallenge(
           Guid id)
        {

            var firstJobDetails = await _dataContext.ReasonTakingFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.CareerChallenge += 1;
            _dataContext.ReasonTakingFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-taking-first-job/related-special-skill/{id}")]
        public async Task<ActionResult> CreateRelatedSpecialSkill(
           Guid id)
        {

            var firstJobDetails = await _dataContext.ReasonTakingFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.RelatedSpecialSkil += 1;
            _dataContext.ReasonTakingFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-taking-first-job/proximity-my-residence/{id}")]
        public async Task<ActionResult> CreateProximityMyResidence(
           Guid id)
        {

            var firstJobDetails = await _dataContext.ReasonTakingFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.ProximtyMyResidence += 1;
            _dataContext.ReasonTakingFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-taking-first-job/other/{id}")]
        public async Task<ActionResult> CreateReasonTakingFirstJobOther(
           Guid id)
        {

            var firstJobDetails = await _dataContext.ReasonTakingFirstJobs.FindAsync(id);
            if(firstJobDetails == null) return BadRequest();
            firstJobDetails.Other += 1;
            _dataContext.ReasonTakingFirstJobs.Update(firstJobDetails);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("reason-taking-first-job/total")]
        public async Task<ActionResult> ReasonTakingFirstJobTotal(
           Guid id)
        {
            var total = await _dataContext.ReasonTakingFirstJobs
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Salary 
                                        + x.CareerChallenge
                                        + x.RelatedSpecialSkil
                                        + x.ProximtyMyResidence
                                        + x.Other);
            return Ok(total);
        }
    }
}