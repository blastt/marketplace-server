using Domain.Enums;

namespace Domain.Entities;

public class Offer
{
    public long Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public OfferStatus OfferStatus { get; set; }
    public IList<Game> Games { get; private set; } = new List<Game>();
}