using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using University.API.Services.Interfaces;
using University.API.ViewModels.People;

namespace University.API.Controllers
{
    /// <summary>
    /// This class provides functionality connected with People.
    /// </summary>

    [ApiController]
    [Route("people")]
    public class PeopleController : ControllerBase
    {
        private IPeopleService peopleService;

        public PeopleController(IPeopleService peopleService)
        {
            this.peopleService = peopleService;
        }

        #region POST METHODS
        /// <summary>
        /// Create a person in DB
        /// </summary>
        /// <param name="personViewModel">
        /// Passed parameter is AddPersonViewModel type
        /// </param>
        [HttpPost]
        [Route("add")]
        public async Task Add(AddPersonViewModel personViewModel)
        {
            await this.peopleService.AddAsync(personViewModel);
        }

        /// <summary>
        /// Edit a person properties
        /// </summary>
        /// <param name="person">
        /// Passed parameter is type EditPersonViewModel and contains the same properties as in AddPersonViewModel.
        /// </param>
        [HttpPost]
        [Route("edit")]
        public async Task Edit(EditPersonViewModel person)
        {
            await this.peopleService.EditAsync(person);
        }
        #endregion

        #region GET METHODS
        /// <summary>
        /// Get all records from DB
        /// </summary>
        /// <returns>
        /// IEnumerable of teachers projected to GetTeacherViewModel 
        /// </returns>
        [HttpGet]
        [Route("get-all")]
        public IEnumerable<GetPersonViewModel> GetAll()
        {
            return this.peopleService.GetAll<GetPersonViewModel>().ToList();
        }

        /// <summary>
        /// Get all records from DB
        /// </summary>
        /// <returns>
        /// IEnumerable of all people projected to GetTeacherIdAndNameViewModel 
        /// </returns>
        [HttpGet]
        [Route("get-all-with-id-and-name")]
        public IEnumerable<GetPeopleIdAndNameViewModel> GetAllWithIdAndName()
        {
            return this.peopleService.GetAllWithIdAndName();
        }

        /// <summary>
        /// This method gets a student with specified id;
        /// </summary>
        /// <param name="id">
        /// Representing a student id
        /// </param>
        /// <returns>
        /// Returns the student mapped to EditStudentViewModel
        /// </returns>
        [HttpGet]
        [Route("get-by-id/{id?}")]
        public async Task<EditPersonViewModel> GetById(int id)
        {
            return await this.peopleService
                .GetByIdAsync<EditPersonViewModel>(id);
        }

        /// <summary>
        /// Delete student with specified id
        /// </summary>
        /// <param name="id">
        /// Representing a student id
        /// </param>
        [HttpGet]
        [Route("delete/{id?}")]
        public async Task Delete(int id)
        {
            await this.peopleService.DeleteAsync(id);
        }
        #endregion
    }
}
