namespace Domain.Common;

public interface IHasDomainEvent
{
    public List<DomainEvent> DomainEvents { get; set; }
}

public abstract class DomainEvent
{
    public bool IsPublished { get; set; }
    public DateTimeOffset DateOccured { get; protected set; }
    
    protected DomainEvent()
    {
        DateOccured = DateTimeOffset.Now;
    }
}