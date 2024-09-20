using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class EmploymentDetailsController : BaseApiController
    {
        public EmploymentDetailsController(DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
        }

        [HttpPut("presently-employed/yes/{id}")]
        public async Task<ActionResult> CreateYesPresentlyEmployed(
           Guid id)
        {

            var presentlyEmployed = await _dataContext.PresentlyEmployeds.FindAsync(id);
            if(presentlyEmployed == null) return BadRequest();
            presentlyEmployed.Yes += 1;
            _dataContext.PresentlyEmployeds.Update(presentlyEmployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("presently-employed/no/{id}")]
        public async Task<ActionResult> CreateNoPresentlyEmployed(
           Guid id)
        {

            var presentlyEmployed = await _dataContext.PresentlyEmployeds.FindAsync(id);
            if(presentlyEmployed == null) return BadRequest();
            presentlyEmployed.No += 1;
            _dataContext.PresentlyEmployeds.Update(presentlyEmployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("presently-employed/total/{id}")]
        public async Task<ActionResult> PresentlyEmployedTotal(
           Guid id)
        {
            var total = await _dataContext.PresentlyEmployeds
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Yes + x.No);
            return Ok(total);
        }

        [HttpPut("company-type/bpo-industry/{id}")]
        public async Task<ActionResult> CreateBPOCompanyType(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.BPOIndustry += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/educational-institution/{id}")]
        public async Task<ActionResult> CreateEducationalIns(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.EducationalInstitution += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/multination-company/{id}")]
        public async Task<ActionResult> CreateMultinationCompany(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.MultinationalCompany += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/banking-institution/{id}")]
        public async Task<ActionResult> CreateBankingIns(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.BankingInstitution += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/goverment-offices/{id}")]
        public async Task<ActionResult> CreateGovermentOffice(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.GovermentOffices += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/private-institution/{id}")]
        public async Task<ActionResult> CreatePrivateIns(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.PrivateInstitution += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/itindustry/{id}")]
        public async Task<ActionResult> CreateITIndustry(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.ITIndustry += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/insurance/{id}")]
        public async Task<ActionResult> CreateInsurance(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.Insurances += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/communication-company/{id}")]
        public async Task<ActionResult> CreateCommunicationCompany(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.CommunicationCompany += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("company-type/other/{id}")]
        public async Task<ActionResult> CreateCompanyOther(
           Guid id)
        {

            var companyType = await _dataContext.CompanyTypes.FindAsync(id);
            if(companyType == null) return BadRequest();
            companyType.Other += 1;
            _dataContext.CompanyTypes.Update(companyType);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }


        [HttpGet("company-type/total")]
        public async Task<ActionResult> TotalCompanyType(
           Guid id)
        {
            var total = await _dataContext.CompanyTypes
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.BPOIndustry 
                                        + x.EducationalInstitution
                                        + x.MultinationalCompany
                                        + x.BankingInstitution
                                        + x.GovermentOffices
                                        + x.PrivateInstitution
                                        + x.ITIndustry
                                        + x.Insurances
                                        + x.CommunicationCompany
                                        + x.Other);
            return Ok(total);
        }

        [HttpPut("jobposition/managerial/{id}")]
        public async Task<ActionResult> CreateManagerial(
           Guid id)
        {

            var jobPosition = await _dataContext.JobPositions.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Managerial += 1;
            _dataContext.JobPositions.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("jobposition/supervisory/{id}")]
        public async Task<ActionResult> CreateSupervisory(
           Guid id)
        {

            var jobPosition = await _dataContext.JobPositions.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Supervisory += 1;
            _dataContext.JobPositions.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("jobposition/clerical/{id}")]
        public async Task<ActionResult> CreateClerical(
           Guid id)
        {

            var jobPosition = await _dataContext.JobPositions.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Clerical += 1;
            _dataContext.JobPositions.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("jobposition/self-employed/{id}")]
        public async Task<ActionResult> CreateSelfEmployed(
           Guid id)
        {

            var jobPosition = await _dataContext.JobPositions.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.SelfEmployed += 1;
            _dataContext.JobPositions.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("jobposition/other/{id}")]
        public async Task<ActionResult> CreateJPOther(
           Guid id)
        {

            var jobPosition = await _dataContext.JobPositions.FindAsync(id);
            if(jobPosition == null) return BadRequest();
            jobPosition.Other += 1;
            _dataContext.JobPositions.Update(jobPosition);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("jobposition/total")]
        public async Task<ActionResult> JobPositionTotal(
           Guid id)
        {
            var total = await _dataContext.JobPositions
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Managerial 
                                        + x.Supervisory
                                        + x.Clerical
                                        + x.SelfEmployed
                                        + x.Other);
            return Ok(total);
        }

        [HttpPut("employmentstatus/regular/{id}")]
        public async Task<ActionResult> CreateRegular(
           Guid id)
        {

            var empStatus = await _dataContext.EmploymentStatuses.FindAsync(id);
            if(empStatus == null) return BadRequest();
            empStatus.Regular += 1;
            _dataContext.EmploymentStatuses.Update(empStatus);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("employmentstatus/temporary/{id}")]
        public async Task<ActionResult> CreateTemporary(
           Guid id)
        {

            var empStatus = await _dataContext.EmploymentStatuses.FindAsync(id);
            if(empStatus == null) return BadRequest();
            empStatus.Temporary += 1;
            _dataContext.EmploymentStatuses.Update(empStatus);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("employmentstatus/casual/{id}")]
        public async Task<ActionResult> CreateCasual(
           Guid id)
        {

            var empStatus = await _dataContext.EmploymentStatuses.FindAsync(id);
            if(empStatus == null) return BadRequest();
            empStatus.Casual += 1;
            _dataContext.EmploymentStatuses.Update(empStatus);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("employmentstatus/partime/{id}")]
        public async Task<ActionResult> CreatePartTime(
           Guid id)
        {

            var empStatus = await _dataContext.EmploymentStatuses.FindAsync(id);
            if(empStatus == null) return BadRequest();
            empStatus.PartTime += 1;
            _dataContext.EmploymentStatuses.Update(empStatus);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("employmentstatus/probationary/{id}")]
        public async Task<ActionResult> CreateProbationary(
           Guid id)
        {

            var empStatus = await _dataContext.EmploymentStatuses.FindAsync(id);
            if(empStatus == null) return BadRequest();
            empStatus.Probitionary += 1;
            _dataContext.EmploymentStatuses.Update(empStatus);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("employmentstatus/contractual/{id}")]
        public async Task<ActionResult> CreateContractual(
           Guid id)
        {

            var empStatus = await _dataContext.EmploymentStatuses.FindAsync(id);
            if(empStatus == null) return BadRequest();
            empStatus.Contractual += 1;
            _dataContext.EmploymentStatuses.Update(empStatus);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("employmentstatus/total")]
        public async Task<ActionResult> EmplStatusTotal(
           Guid id)
        {
            var total = await _dataContext.EmploymentStatuses
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Regular 
                                        + x.Temporary
                                        + x.Casual
                                        + x.Contractual
                                        + x.PartTime
                                        + x.Probitionary);
            return Ok(total);
        }

        [HttpPut("employed-after-grad/yes/{id}")]
        public async Task<ActionResult> CreateYesAfterGrad(
           Guid id)
        {

            var empAfterGrad = await _dataContext.EmployedAfterGraduations.FindAsync(id);
            if(empAfterGrad == null) return BadRequest();
            empAfterGrad.Yes += 1;
            _dataContext.EmployedAfterGraduations.Update(empAfterGrad);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("employed-after-grad/no/{id}")]
        public async Task<ActionResult> CreateNoAfterGrad(
           Guid id)
        {

            var empAfterGrad = await _dataContext.EmployedAfterGraduations.FindAsync(id);
            if(empAfterGrad == null) return BadRequest();
            empAfterGrad.No += 1;
            _dataContext.EmployedAfterGraduations.Update(empAfterGrad);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("employed-after-grad/total")]
        public async Task<ActionResult> EmplAfterGradTotal(
           Guid id)
        {
            var total = await _dataContext.EmployedAfterGraduations
                                    .Where(i => i.Id == id)
                                    .SumAsync(x => x.Yes 
                                        + x.No);
            return Ok(total);
        }
        
        [HttpPut("reason-for-unemployed/pursuing-advance-studies/{id}")]
        public async Task<ActionResult> CreatePursuingAdvanceStudies(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.PursingAdvanceStudies += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/familyconcern/{id}")]
        public async Task<ActionResult> CreateFamilyConcern(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.FamilyConcern += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/health-reason/{id}")]
        public async Task<ActionResult> CreateHealthReason(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.HealthReason += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/lack-of-exp/{id}")]
        public async Task<ActionResult> CreateLackOfExp(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.LackOfExp += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/lack-of-interest/{id}")]
        public async Task<ActionResult> CreateLackOfInterest(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.LackOfInterest += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/inadeq-skill/{id}")]
        public async Task<ActionResult> CreateInadeqSkill(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.InadeqSkill += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/no-job-opportunity/{id}")]
        public async Task<ActionResult> CreateNoJobOpportunity(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.NoJobOpport += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/did-not-look-for-job/{id}")]
        public async Task<ActionResult> CreateDidNotLookForJob(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.DidNotLookForJob += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("reason-for-unemployed/unsatisfactoryOffer/{id}")]
        public async Task<ActionResult> CreateUnsatifactoryOffer(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.UnsatisfactoryOffer += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }
        [HttpPut("reason-for-unemployed/Other/{id}")]
        public async Task<ActionResult> CreateReasonForUnemployedOther(
           Guid id)
        {

            var reasonForUnemployed = await _dataContext.ReasonForUnemployeds.FindAsync(id);
            if(reasonForUnemployed == null) return BadRequest();
            reasonForUnemployed.Other += 1;
            _dataContext.ReasonForUnemployeds.Update(reasonForUnemployed);

            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}