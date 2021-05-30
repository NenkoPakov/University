using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using University.API.Data.Common;
using University.API.Models;
using University.API.Services.Interfaces;
using University.API.ViewModels.People;

namespace University.API.Services
{
    public class PeopleService : BaseService<Person, AddPersonViewModel, EditPersonViewModel>, IPeopleService
    {
        public PeopleService(IRepository<Person> entityRepository, IMapper mapper)
            : base(entityRepository, mapper)
        {
        }

        /// <summary>
        /// Gets all people from People table in DB then project them to GetPeopleIdAndNameViewModel
        /// </summary>
        /// <returns>
        /// IEnumerable of people projected to GetPeopleIdAndNameViewModel 
        /// </returns>
        public IEnumerable<GetPeopleIdAndNameViewModel> GetAllWithIdAndName()
        {
            return base.GetAll<GetPeopleIdAndNameViewModel>()
                    .ToList();
        }
    }
}
