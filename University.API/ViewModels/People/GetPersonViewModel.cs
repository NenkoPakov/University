using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace University.API.ViewModels.People
{
    public class GetPersonViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
    }
}
