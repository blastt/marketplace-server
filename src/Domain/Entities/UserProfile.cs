using Domain.ValueObjects;

namespace Domain.Entities;

public class UserProfile
{
    public long Id { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public ProfilePicture? ProfilePicture { get; set; }
}