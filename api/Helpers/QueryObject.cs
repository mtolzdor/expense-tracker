namespace api.Helpers
{
    public class QueryObject
    {
        public string? CatagoryName { get; set; } = null;
        public string? FilterBy { get; set; } = null;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 11;
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;

    }
}