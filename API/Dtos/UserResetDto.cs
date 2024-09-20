using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserResetDto
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Password { get; set; }
    }
}