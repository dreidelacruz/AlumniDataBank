using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class StayFirstJob : BaseEntity
    {
        public int LessThanAMonth { get; set; }
        public int MonthOneToThree { get; set; }
        public int MonthFourToSix { get; set; }
        public int MonthSevenToEleven { get; set; }
        public int YearOneToTwo { get; set; }
        public int YearTwoToThree { get; set; }
        public int YearThreeToFour { get; set; }
        public int Others { get; set; }
        [JsonIgnore]
        public FirstJobDetail FirstJobDetail { get; set; }
        public Guid FirstJobDetailId { get; set; }
    }
}