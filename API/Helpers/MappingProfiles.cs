using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Dtos.Course;
using API.Dtos.Gender;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //* User
            CreateMap<UserPhoto, ContentPhotoCreateDto>();
            CreateMap<UpdateAlumniDto, AppUser>();
            CreateMap<AppUser, UserDto>()
               .ForMember(p => p.UserPhoto, 
               o => o.MapFrom(s => s.UserPhoto.Url))
               .ForMember(p => p.ProofPhoto, 
               o => o.MapFrom(s => s.ProofPhoto.Url));

            //* JobPost
            CreateMap<CreateJobDto, JobPost>();
            CreateMap<JobPost, JobToReturn>();

            //* Year
            CreateMap<CreateYearDto, Year>();

            //* Course
            CreateMap<CreateBSITFemaleDto, Course>();
            CreateMap<CreateBSCSFemaleDto, Course>();
            CreateMap<CreateACTFemaleDto, Course>();
        }
    }
}