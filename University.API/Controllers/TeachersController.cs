using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using University.API.Services.Interfaces;
using University.API.ViewModels.Teachers;

namespace University.API.Controllers
{
    /// <summary>
    /// This class provides functionality connected with Teachers.
    /// </summary>

    [ApiController]
    [Route("teachers")]
    public class TeachersController : ControllerBase
    {
        private ITeachersService teachersService;

        public TeachersController(ITeachersService teachersService)
        {
            this.teachersService = teachersService;
        }

        #region POST METHODS
        /// <summary>
        /// Create teacher in DB
        /// </summary>
        /// <param name="teacherViewModel">
        /// Passed parameter is AddTeacherViewModel type
        /// </param>
        [HttpPost]
        [Route("add")]
        public async Task Add(AddTeacherViewModel teacherViewModel)
        {
            await this.teachersService.AddAsync(teacherViewModel);
        }

        /// <summary>
        /// Edit teacher properties
        /// </summary>
        /// <param name="teacher">
        /// Passed parameter is type EditTeacherViewModel and contains the same properties as in AddTeacherViewModel.
        /// </param>
        [HttpPost]
        [Route("edit")]
        public async Task Edit(EditTeacherViewModel teacher)
        {
            await this.teachersService.EditAsync(teacher);
        }

        /// <summary>
        /// Set the specified teacher on subject do not have a teacher
        /// </summary>
        /// <param name="model">
        /// Passed parameter is type SetTeacherToSubjectViewModel type
        /// </param>
        [HttpPost]
        [Route("set-subject-to-teacher")]
        public async Task SetSubjectToTeacher(SetTeacherToSubjectViewModel model)
        {
            await this.teachersService.RegisterSubjectToTeacher(model.TeacherId, model.SubjectId);
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
        public IEnumerable<GetTeacherViewModel> GetAll()
        {
            return this.teachersService.GetAll<GetTeacherViewModel>().ToList();
        }

        /// <summary>
        /// Get all records from DB
        /// </summary>
        /// <returns>
        /// IEnumerable of all teachers projected to GetTeacherIdAndNameViewModel 
        /// </returns>
        [HttpGet]
        [Route("get-all-with-id-and-name")]
        public IEnumerable<GetTeacherIdAndNameViewModel> GetAllWithIdAndName()
        {
            return this.teachersService.GetAllWithIdAndName();
        }

        /// <summary>
        /// This method gets a teacher with specified id;
        /// </summary>
        /// <param name="id">
        /// Representing a teacher id
        /// </param>
        /// <returns>
        /// Returns the teacher mapped to EditTeacherViewModel
        /// </returns>
        [HttpGet]
        [Route("get-by-id/{id?}")]
        public async Task<EditTeacherViewModel> GetById(int id)
        {
            return await this.teachersService
                .GetByIdAsync<EditTeacherViewModel>(id);
        }

        /// <summary>
        /// This method gets all teachers and count of subjects they lead
        /// </summary>
        /// <returns>
        /// IEnumerable of all teachers projected to GetAllWithSubjectsCountViewModel
        /// </returns>
        [HttpGet]
        [Route("get-all-with-subjects-count")]
        public IEnumerable<GetAllWithSubjectsCountViewModel> GetAllWithSubjectsCount()
        {
            return this.teachersService.GetAllWithSubjectsCount();
        }

        /// <summary>
        /// This method gets all teachers and all subject names they lead and count of students in them
        /// </summary>
        /// <returns>
        /// IEnumerable of all teachers projected to GetAllSubjectsAndEnrolledStundentsCountViewModel
        /// </returns>
        [HttpGet]
        [Route("get-all-teachers-with-subjects-and-students-count")]
        public IEnumerable<GetAllSubjectsAndEnrolledStundentsCountViewModel> GetAllSubjectsAndEnrolledStundentsCount()
        {
            return this.teachersService.GetAllSubjectsAndEnrolledStundentsCount();
        }

        /// <summary>
        /// This method gets the teachers with the most students count
        /// </summary>
        /// <returns>
        /// Top 3 most preferred teachers projected to GetTopThreeMostPreferredViewModel
        /// </returns>
        [HttpGet]
        [Route("get-top-3-most-preferred")]
        public IEnumerable<GetTopThreeMostPreferredViewModel> GetTopThreeMostPreferred()
        {
            return this.teachersService.GetTopThreeMostPreferred();
        }

        /// <summary>
        /// Delete teacher with specified id
        /// </summary>
        /// <param name="id">
        /// Representing a teacher id
        /// </param>
        [HttpGet]
        [Route("delete/{id?}")]
        public async Task DeleteAsync(int id)
        {
            await this.teachersService.DeleteAsync(id);
        }
        #endregion
    }
}
