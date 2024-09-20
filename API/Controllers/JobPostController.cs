using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class JobPostController : BaseApiController
    {
        private readonly IPhotoService _photoService;
        private readonly UserManager<AppUser> _userManager;
        public JobPostController(
            IPhotoService _photoService,
            UserManager<AppUser> userManager,
            DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
            this._photoService = _photoService;
            this._userManager = userManager;
        }



        [HttpGet]
        public async Task<ActionResult> GetJobs()
        {
            var listOfJob = await _dataContext.JobPosts
                                    .Include(p => p.UserPhoto)
                                    .Include(p => p.JobFile)
                                    .ToListAsync();
            return Ok(listOfJob);
        }
        
        [HttpPost]
        public async Task<ActionResult<JobToReturn>> CreateJob
            (CreateJobDto jobpostDto)
        {
           
            var jobpost = _mapper.Map<CreateJobDto, 
                            JobPost>(jobpostDto);

            _dataContext.JobPosts.Add(jobpost);
            await _dataContext.SaveChangesAsync();

            var jobToReturn = _mapper.Map<JobPost, JobToReturn>(jobpost);
            return Ok(jobpost);
        }

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult> AddPhoto(
            IFormFile file, Guid id)
        {
            var jobPost = await _dataContext.JobPosts
                .Include(p => p.UserPhoto)
                .SingleOrDefaultAsync(
                x => x.Id == id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var userPhoto = new UserPhoto {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            jobPost.UserPhoto = userPhoto;
            
             _dataContext.JobPosts.Update(jobPost);
            await _dataContext.SaveChangesAsync();
            return Ok();

        }


        [HttpPost("add-file/{id}")]
        public async Task<ActionResult> AddFile(
            IFormFile file, Guid id)
        {
            var jobPost = await _dataContext.JobPosts
                .Include(p => p.JobFile)
                .SingleOrDefaultAsync(
                x => x.Id == id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var userPhoto = new JobFile {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            jobPost.JobFile = userPhoto;
            
             _dataContext.JobPosts.Update(jobPost);
            await _dataContext.SaveChangesAsync();
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJobPost(Guid id)
        {
            var jobPost = await _dataContext.JobPosts.FindAsync(id);

            if(jobPost == null) return BadRequest();

            _dataContext.JobPosts.Remove(jobPost);
            var result = await _dataContext.SaveChangesAsync();

            if (result <= 0)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}