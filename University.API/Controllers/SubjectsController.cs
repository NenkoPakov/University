using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using University.API.Services.Interfaces;
using University.API.ViewModels.Subjects;

namespace University.API.Controllers
{
    /// <summary>
    /// This class provides functionality connected with Subjects.
    /// </summary>

    [ApiController]
    [Route("subjects")]
    public class SubjectsContoller : ControllerBase
    {
        private ISubjectsService subjectsService;
        private readonly IStudentsService studentsService;

        public SubjectsContoller(ISubjectsService subjectsService, IStudentsService studentsService)
        {
            this.subjectsService = subjectsService;
            this.studentsService = studentsService;
        }

        #region POST MTHODS
        /// <summary>
        /// Create subject in DB
        /// </summary>
        /// <param name="subjectViewModel">
        /// Passed parameter is AddSubjectViewModel type
        /// </param>
        [HttpPost]
        [Route("add")]
        public async Task Add(AddSubjectViewModel subjectViewModel)
        {
            await this.subjectsService.AddAsync(subjectViewModel);
        }

        /// <summary>
        /// Edit subject properties
        /// </summary>
        /// <param name="subject">
        /// Passed parameter is type EditSubjectViewModel and contains the same properties as in AddSubjectViewModel.
        /// </param>
        [HttpPost]
        [Route("edit")]
        public async Task Edit(EditSubjectViewModel subject)
        {
            await this.subjectsService.EditAsync(subject);
        }
        #endregion

        #region GET METHODS
        /// <summary>
        /// Get all records from DB
        /// </summary>
        /// <returns>
        /// IEnumerable of subjects projected to GetSubjectViewModel 
        /// </returns>
        [HttpGet]
        [Route("get-all")]
        public IEnumerable<GetSubjectViewModel> GetAll()
        {
            return this.subjectsService
                .GetAll<GetSubjectViewModel>()
                .ToList();
        }

        /// <summary>
        /// Gets only subjects without teacher
        /// </summary>
        /// <returns>
        /// IEnumerable of subjects projected to GetSubjectIdAndName 
        /// </returns>
        [HttpGet]
        [Route("get-subjects-without-teacher")]
        public IEnumerable<GetSubjectIdAndName> GetSubjectsWithoutTeacher()
        {
            return this.subjectsService
                .GetSubjectsWithoutTeacher();
        }

        /// <summary>
        /// This method gets a subject with specified id;
        /// </summary>
        /// <param name="id">
        /// Representing a subject id
        /// </param>
        /// <returns>
        /// Returns the subject mapped to EditSubjectViewModel
        /// </returns>
        [HttpGet]
        [Route("get-by-id/{id?}")]
        public async Task<EditSubjectViewModel> GetById(int id)
        {
            return await this.subjectsService
                .GetByIdAsync<EditSubjectViewModel>(id);
        }

        /// <summary>
        /// Get a only subjects for which the specified student is not enrolled
        /// </summary>
        /// <param name="subjectId">
        /// Representing a student id
        /// </param>
        /// <returns>
        /// IEnumerable of subjects projected to GetSubjectIdAndName
        /// </returns>
        [HttpGet]
        [Route("get-all-unenrolled-subjects/{studentId?}")]
        public IEnumerable<GetSubjectIdAndName> GetAllUnenrolledSubjects(int studentId)
        {
            IEnumerable<int> studentSubjects = this.studentsService.GetStudentSubjects(studentId).Select(s => s.Id);

            return this.subjectsService
                .GetAllUnenrolledSubjects(studentSubjects);
        }

        /// <summary>
        /// This method gets the subjects with the most students count
        /// </summary>
        /// <returns>
        /// Top 3 most attended subject projected to GetTopThreeMostAttendedViewModel
        /// </returns>
        [HttpGet]
        [Route("get-top-3-most-attended")]
        public IEnumerable<GetTopThreeMostAttendedViewModel> GetTopThreeMostAttended()
        {
            return this.subjectsService.GetTopThreeMostAttended();
        }
        
        /// <summary>
        /// Delete subject with specified id
        /// </summary>
        /// <param name="id">
        /// Representing a subject id
        /// </param>
        [HttpGet]
        [Route("delete/{id?}")]
        public async Task DeleteAsync(int id)
        {
            await this.subjectsService.DeleteAsync(id);
        }
        #endregion
    }
}
