using api.Interfaces;

namespace api.Services
{
    public class SystemDateTime : IDateTime
    {
        public DateTime Now
        {
            get { return DateTime.Now; }
        }

        public DateTime WeekStart
        {
            get { return DateTime.Today.AddDays(DayOfWeek.Monday - DateTime.Today.DayOfWeek); }
        }
        public DateTime Today
        {
            get { return DateTime.Today; }
        }
    }
}