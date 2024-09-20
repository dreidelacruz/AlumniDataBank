using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CompanyType : BaseEntity
    {
        public int BPOIndustry { get; set; }
        public int EducationalInstitution { get; set; }
        public int MultinationalCompany { get; set; }
        public int BankingInstitution { get; set; }
        public int GovermentOffices { get; set; }
        public int PrivateInstitution { get; set; }
        public int ITIndustry { get; set; }
        public int Insurances { get; set; }
        public int CommunicationCompany { get; set; }
        public int Other { get; set; }
        public int Total { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
    }
}