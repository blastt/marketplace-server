using Domain.Common;

namespace Domain.ValueObjects;

public class ProfilePicture : ValueObject
{
    public string? SmallPicturePath { get; private set; }
    public string? MediumPicturePath { get; private set; }
    public string? LargePicturePath { get; private set; }
    
    public ProfilePicture()
    {
        
    }
    
    public ProfilePicture(string? smallPicturePath, string? mediumPicturePath, string? largePicturePath)
    {
        SmallPicturePath = smallPicturePath;
        MediumPicturePath = mediumPicturePath;
        LargePicturePath = largePicturePath;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return SmallPicturePath;
        yield return MediumPicturePath;
        yield return LargePicturePath;
    }
}