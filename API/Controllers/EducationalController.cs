using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EducationalController : BaseApiController
    {
        public EducationalController(DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
        }
        
        [HttpPut("present-job-related-course/yes/{id}")]
        public async Task<ActionResult> CreatePresentJobRelatedCourseYes(
           Guid id)
        {

            var jobPosition = await _dataContext.PresentJobRelatedCourses.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Yes += 1;
            _dataContext.PresentJobRelatedCourses.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("present-job-related-course/no/{id}")]
        public async Task<ActionResult> CreatePresentJobRelatedCourseNo(
           Guid id)
        {

            var jobPosition = await _dataContext.PresentJobRelatedCourses.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.No += 1;
            _dataContext.PresentJobRelatedCourses.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("present-job-related-course/total")]
        public async Task<ActionResult> PresentJobRelatedCourseTotal(
           Guid id)
        {
            var total = await _dataContext.PresentJobRelatedCourses
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Yes 
                                        + x.No);
            return Ok(total);
        }

        [HttpPut("competencies-learning-in-college/communication-skill/{id}")]
        public async Task<ActionResult> CreateCommunicationSkill(
           Guid id)
        {

            var jobPosition = await _dataContext.CompentencyLearningInColleges.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.CommunicationSkill += 1;
            _dataContext.CompentencyLearningInColleges.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("competencies-learning-in-college/critical-thinking-skill/{id}")]
        public async Task<ActionResult> CreateCriticalThinkingSkill(
           Guid id)
        {
            var jobPosition = await _dataContext.CompentencyLearningInColleges.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.CriticalThinkingSkill += 1;
            _dataContext.CompentencyLearningInColleges.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("competencies-learning-in-college/human-relation-skill/{id}")]
        public async Task<ActionResult> CreateHumanRelationSkill(
           Guid id)
        {
            var jobPosition = await _dataContext.CompentencyLearningInColleges.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.HumanRelationSkill += 1;
            _dataContext.CompentencyLearningInColleges.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("competencies-learning-in-college/entrep-skill/{id}")]
        public async Task<ActionResult> CreateEntrepSkill(
           Guid id)
        {
            var jobPosition = await _dataContext.CompentencyLearningInColleges.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.EntrepreneurialSkill += 1;
            _dataContext.CompentencyLearningInColleges.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("competencies-learning-in-college/it-skill/{id}")]
        public async Task<ActionResult> CreateItSkill(
           Guid id)
        {
            var jobPosition = await _dataContext.CompentencyLearningInColleges.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.ITSkill += 1;
            _dataContext.CompentencyLearningInColleges.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("competencies-learning-in-college/problem-solving-skill/{id}")]
        public async Task<ActionResult> CreateProblemSolvingSkill(
           Guid id)
        {
            var jobPosition = await _dataContext.CompentencyLearningInColleges.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.ProblemSolvingSkill += 1;
            _dataContext.CompentencyLearningInColleges.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("competencies-learning-in-college/other-skill/{id}")]
        public async Task<ActionResult> CreateOtherSkill(
           Guid id)
        {
            var jobPosition = await _dataContext.CompentencyLearningInColleges.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.OtherSkill += 1;
            _dataContext.CompentencyLearningInColleges.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ged/score1/{id}")]
        public async Task<ActionResult> CreateScore1Ged(
           Guid id)
        {
            var jobPosition = await _dataContext.Geds.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score1 += 1;
            _dataContext.Geds.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ged/score2/{id}")]
        public async Task<ActionResult> CreateScore2Ged(
           Guid id)
        {
            var jobPosition = await _dataContext.Geds.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score2 += 1;
            _dataContext.Geds.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ged/score3/{id}")]
        public async Task<ActionResult> CreateScore3Ged(
           Guid id)
        {
            var jobPosition = await _dataContext.Geds.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score3 += 1;
            _dataContext.Geds.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ged/score4/{id}")]
        public async Task<ActionResult> CreateScore4Ged(
           Guid id)
        {
            var jobPosition = await _dataContext.Geds.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score4 += 1;
            _dataContext.Geds.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ged/score5/{id}")]
        public async Task<ActionResult> CreateScore5Ged(
           Guid id)
        {
            var jobPosition = await _dataContext.Geds.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score5 += 1;
            _dataContext.Geds.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        //* ProfessionalSubjects
        [HttpPut("professional-subject/score1/{id}")]
        public async Task<ActionResult> CreateScore1ProfessionalSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ProfessionalSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score1 += 1;
            _dataContext.ProfessionalSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("professional-subject/score2/{id}")]
        public async Task<ActionResult> CreateScore2ProfessionalSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ProfessionalSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score2 += 1;
            _dataContext.ProfessionalSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("professional-subject/score3/{id}")]
        public async Task<ActionResult> CreateScore3ProfessionalSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ProfessionalSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score3 += 1;
            _dataContext.ProfessionalSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("professional-subject/score4/{id}")]
        public async Task<ActionResult> CreateScore4ProfessionalSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ProfessionalSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score4 += 1;
            _dataContext.ProfessionalSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("professional-subject/score5/{id}")]
        public async Task<ActionResult> CreateScore5ProfessionalSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ProfessionalSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score5 += 1;
            _dataContext.ProfessionalSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("elective-subject/score1/{id}")]
        public async Task<ActionResult> CreateScore1ElectiveSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ElectiveSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score1 += 1;
            _dataContext.ElectiveSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("elective-subject/score2/{id}")]
        public async Task<ActionResult> CreateScore2ElectiveSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ElectiveSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score2 += 1;
            _dataContext.ElectiveSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("elective-subject/score3/{id}")]
        public async Task<ActionResult> CreateScore3ElectiveSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ElectiveSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score3 += 1;
            _dataContext.ElectiveSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("elective-subject/score4/{id}")]
        public async Task<ActionResult> CreateScore4ElectiveSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ElectiveSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score4 += 1;
            _dataContext.ElectiveSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("elective-subject/score5/{id}")]
        public async Task<ActionResult> CreateScore5ElectiveSubject(
           Guid id)
        {
            var jobPosition = await _dataContext.ElectiveSubjects.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score5 += 1;
            _dataContext.ElectiveSubjects.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("it-certification/score1/{id}")]
        public async Task<ActionResult> CreateScore1ITCertification(
           Guid id)
        {
            var jobPosition = await _dataContext.ITCertifications.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score1 += 1;
            _dataContext.ITCertifications.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("it-certification/score2/{id}")]
        public async Task<ActionResult> CreateScore2ITCertification(
           Guid id)
        {
            var jobPosition = await _dataContext.ITCertifications.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score2 += 1;
            _dataContext.ITCertifications.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("it-certification/score3/{id}")]
        public async Task<ActionResult> CreateScore3ITCertification(
           Guid id)
        {
            var jobPosition = await _dataContext.ITCertifications.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score3 += 1;
            _dataContext.ITCertifications.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("it-certification/score4/{id}")]
        public async Task<ActionResult> CreateScore4ITCertification(
           Guid id)
        {
            var jobPosition = await _dataContext.ITCertifications.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score4 += 1;
            _dataContext.ITCertifications.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("it-certification/score5/{id}")]
        public async Task<ActionResult> CreateScore5ITCertification(
           Guid id)
        {
            var jobPosition = await _dataContext.ITCertifications.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score5 += 1;
            _dataContext.ITCertifications.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("seminar/score1/{id}")]
        public async Task<ActionResult> CreateScore1Seminar(
           Guid id)
        {
            var jobPosition = await _dataContext.Seminars.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score1 += 1;
            _dataContext.Seminars.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("seminar/score2/{id}")]
        public async Task<ActionResult> CreateScore2Seminar(
           Guid id)
        {
            var jobPosition = await _dataContext.Seminars.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score2 += 1;
            _dataContext.Seminars.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("seminar/score3/{id}")]
        public async Task<ActionResult> CreateScore3Seminar(
           Guid id)
        {
            var jobPosition = await _dataContext.Seminars.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score3 += 1;
            _dataContext.Seminars.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("seminar/score4/{id}")]
        public async Task<ActionResult> CreateScore4Seminar(
           Guid id)
        {
            var jobPosition = await _dataContext.Seminars.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score4 += 1;
            _dataContext.Seminars.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("seminar/score5/{id}")]
        public async Task<ActionResult> CreateScore5Seminar(
           Guid id)
        {
            var jobPosition = await _dataContext.Seminars.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score5 += 1;
            _dataContext.Seminars.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ojt/score1/{id}")]
        public async Task<ActionResult> CreateScore1Ojt(
           Guid id)
        {
            var jobPosition = await _dataContext.Ojts.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score1 += 1;
            _dataContext.Ojts.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ojt/score2/{id}")]
        public async Task<ActionResult> CreateScore2Ojt(
           Guid id)
        {
            var jobPosition = await _dataContext.Ojts.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score2 += 1;
            _dataContext.Ojts.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ojt/score3/{id}")]
        public async Task<ActionResult> CreateScore3Ojt(
           Guid id)
        {
            var jobPosition = await _dataContext.Ojts.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score3 += 1;
            _dataContext.Ojts.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ojt/score4/{id}")]
        public async Task<ActionResult> CreateScore4Ojt(
           Guid id)
        {
            var jobPosition = await _dataContext.Ojts.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score4 += 1;
            _dataContext.Ojts.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("ojt/score5/{id}")]
        public async Task<ActionResult> CreateScore5Ojt(
           Guid id)
        {
            var jobPosition = await _dataContext.Ojts.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Score5 += 1;
            _dataContext.Ojts.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}