namespace api.Interfaces
{
    public interface IDateTime
    {
        DateTime Now { get; }
        DateTime Today { get; }
        DateTime WeekStart { get; }
        int Month { get; }
    }
}