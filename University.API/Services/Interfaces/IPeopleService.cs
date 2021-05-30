using System.Collections.Generic;
using University.API.Models;
using University.API.ViewModels.People;

namespace University.API.Services.Interfaces
{
    public interface IPeopleService : IBaseService<Person, AddPersonViewModel, EditPersonViewModel>
    {
        IEnumerable<GetPeopleIdAndNameViewModel> GetAllWithIdAndName();
    }
}
