namespace api.Helpers
{
    public class QueryObject
    {
        public string? CatagoryName { get; set; } = null;
        public string? FilterBy { get; set; } = null;
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;

    }
}