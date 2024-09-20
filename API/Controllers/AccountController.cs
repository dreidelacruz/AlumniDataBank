using System.Web;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IPhotoService _photoService;
        private readonly IConfiguration _config;
        private readonly IEmailService _emailService;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IPhotoService photoService,
            IConfiguration config,
            IEmailService emailService,
            DataContext dataContext, IMapper mapper) : base(dataContext, mapper)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._photoService = photoService;
            this._config = config;
            this._emailService = emailService;
        }

        [HttpGet("alumni/all")]
        public async Task<ActionResult<Pagination<UserDto>>> GetAllAlumni()
        {

            var user = await _userManager.Users
                .Include(j => j.JobPosts)
                .ThenInclude(j => j.UserPhoto)
                .Include(j => j.JobPosts)
                .ThenInclude(j => j.JobFile)
                .Include(p => p.UserPhoto)
                .Include(p => p.ProofPhoto)
                .Include(r => r.UserRoles)
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Student"))
                .ToListAsync();

            var totalItems = user.Count();

            var data = _mapper.Map<IReadOnlyList<AppUser>,
                IReadOnlyList<UserDto>>(user);

            return Ok(new Pagination<UserDto>(totalItems, data));

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginUser(LoginDto loginDto)
        {

            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .Include(p => p.ProofPhoto)
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(
                user, loginDto.Password, false
            );

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized("Password is incorrect");
                
            if (!await _userManager.IsEmailConfirmedAsync(user))
                return Unauthorized("Email is not confirmed");


            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Id = user.Id,
                UserPhoto = user.UserPhoto.Url,
                ProofPhoto = user.ProofPhoto.Url,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Created = user.Created,
            };
        }

        [HttpGet("get-current-user/{id}")]
        public async Task<ActionResult<UserDto>> GetCurrentUser(string id)
        {
            var appUser = await _userManager.Users.FirstOrDefaultAsync(
                x => x.Id == id
            );

            var user = await _userManager.Users
                .Include(j => j.JobPosts)
                .ThenInclude(j => j.UserPhoto)
                .Include(j => j.JobPosts)
                .ThenInclude(j => j.JobFile)
                .Include(p => p.ProofPhoto)
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
            .SingleOrDefaultAsync(x => x.Email == appUser.Email);

            return new UserDto
            {
                Id = user.Id,
                UserPhoto = user.UserPhoto.Url,
                ProofPhoto = user.ProofPhoto.Url,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Created = user.Created,
                JobPosts = user.JobPosts,
                Year = user.Year,
                Course = user.Course,
                CompanyName = user.CompanyName,
                CompanyAddress = user.CompanyAddress,
                Gender = user.Gender,
                PhoneNumber = user.PhoneNumber,
                Quote = user.Quote
            };
        }

        [HttpPost("alumni/register")]
        public async Task<ActionResult<UserDto>> RegisterFaculty(
            RegisterUserDto registerFacultyDto)
        {

            var user = new AppUser
            {
                DisplayName = registerFacultyDto.DisplayName,
                Email = registerFacultyDto.Email,
                UserName = registerFacultyDto.Email,
                PhoneNumber = registerFacultyDto.PhoneNumber,
                Year = registerFacultyDto.Year,
                Gender = registerFacultyDto.Gender,
                Course = registerFacultyDto.Course,
                CompanyName = registerFacultyDto.CompanyName,
                CompanyAddress = registerFacultyDto.CompanyAddress,
                EmailConfirmed = false,
                UserPhoto = new UserPhoto("https://res.cloudinary.com/dsb2zudcg/image/upload/v1681628977/Accreditor_bqcqwj.png"),
                ProofPhoto = new ProofPhoto("https://res.cloudinary.com/dr4hvyetl/image/upload/v1725716995/photo_lziaax.png")
            };

            var result = await _userManager.CreateAsync(
                user,
                registerFacultyDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest("A problem creating the faculty");
            }

            if(result.Succeeded)
            {

                var confirmationToken = await _userManager
                                                .GenerateEmailConfirmationTokenAsync(user);

                var uriBuilder = new UriBuilder(_config["ReturnPaths:ConfirmEmail"]);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                query["userId"] = user.Id;
                query["token"] = confirmationToken;
                uriBuilder.Query = query.ToString();
                var urlString = uriBuilder.ToString();

                await _emailService.SendAsync(
                    "dudethemove123634@gmail.com",
                    user.Email, 
                    "Please confirm your email",
                    $"Please click on this link to confirm your email <a href=\"{urlString}\">Verify Email</a>");

            }

            var roleAddResult =
                await _userManager.AddToRoleAsync(user, "Student");

            if (!roleAddResult.Succeeded)
            {

                return BadRequest("Failed to add to role");
            }

            return new UserDto
            {
                Id = user.Id,
                UserPhoto = user.UserPhoto.Url,
                DisplayName = user.DisplayName,
                PhoneNumber = registerFacultyDto.PhoneNumber,
                Year = registerFacultyDto.Year,
                Gender = registerFacultyDto.Gender,
                Course = registerFacultyDto.Course,
                CompanyName = registerFacultyDto.CompanyName,
                CompanyAddress = registerFacultyDto.CompanyAddress,
                Email = user.Email,
                Created = user.Created
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync(
            [FromQuery] string email
        )
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult> AddPhoto(
            IFormFile file, string id)
        {
            var user = await _userManager.Users
                .Include(p => p.UserPhoto)
                .SingleOrDefaultAsync(
                x => x.Id == id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var userPhoto = new UserPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.UserPhoto = userPhoto;

            var saveResult = await _userManager.UpdateAsync(user);

            if (!saveResult.Succeeded)
            {
                return BadRequest("Problem adding photo");
            }

            return Ok(_mapper.Map<ContentPhotoCreateDto>(user.UserPhoto));
        }

        [HttpPost("add-proof-photo/{id}")]
        public async Task<ActionResult> AddProofPhoto(
            IFormFile file, string id)
        {
            var user = await _userManager.Users
                .Include(p => p.ProofPhoto)
                .SingleOrDefaultAsync(
                x => x.Id == id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var userPhoto = new ProofPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.ProofPhoto = userPhoto;

            var saveResult = await _userManager.UpdateAsync(user);

            if (!saveResult.Succeeded)
            {
                return BadRequest("Problem adding proof photo");
            }

            return Ok(_mapper.Map<ContentPhotoCreateDto>(user.UserPhoto));
        }

        [HttpPut("alumni/update")]
        public async Task<ActionResult<UpdateAlumniDto>> UpdateFaculty(
            UpdateAlumniDto facultyUpdateDto)
        {
            var faculty = await _userManager.Users.SingleOrDefaultAsync(
                x => x.Email == facultyUpdateDto.Email);

            if (faculty == null) return BadRequest();

            _mapper.Map(facultyUpdateDto, faculty);

            await _userManager.UpdateAsync(faculty);

            return Ok();
        }

        [HttpPost("resetpassword")]
        public async Task<ActionResult<UserDto>> ResetPasswordUser(
            UserResetDto userResetDto)
        {
            var user = await _userManager.FindByIdAsync(userResetDto.Id);

            var confirmationToken = await _userManager
                                            .GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user,
                confirmationToken, userResetDto.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }
        
        [HttpDelete("alumni/delete/{id}")]
        public async Task<ActionResult> DeleteAlumni(string id)
        {
            var alumni = await _userManager.Users
                .Include(j => j.JobPosts)
                .ThenInclude(j => j.UserPhoto)
                .Include(p => p.UserPhoto)
                .SingleOrDefaultAsync(x => x.Id == id);

            if (alumni == null)
            {
                return NotFound();
            }

            // Delete associated JobPosts and UserPhotos
            foreach (var jobPost in alumni.JobPosts)
            {
                _dataContext.JobPosts.Remove(jobPost);
                // You may need to delete any associated files as well
            }

            if (alumni.UserPhoto != null)
            {
                _dataContext.UserPhotos.Remove(alumni.UserPhoto);
                // You may need to delete the associated photo file as well
            }
            
            await _dataContext.SaveChangesAsync();
            // Delete the alumni
            var result = await _userManager.DeleteAsync(alumni);

            return NoContent();
        }

        [HttpPost("EmailConfirmation")]
        public async Task<IActionResult> VerifyEmail(
            VerifyEmailDto verifyEmailDto)
        {
            var user = await _userManager.FindByIdAsync(verifyEmailDto.UserId);

            var result = await _userManager.ConfirmEmailAsync(user, verifyEmailDto.Token);
            
            if (result.Succeeded)
            {
                
                return Ok();
            }

            return BadRequest();

        }

    }
}