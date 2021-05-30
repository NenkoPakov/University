using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using University.API.Services.Interfaces;
using University.API.ViewModels.Students;

namespace University.API.Controllers
{
    /// <summary>
    /// This class provides functionality connected with Students.
    /// </summary>

    [ApiController]
    [Route("students")]
    public class StudentsController : ControllerBase
    {

        private IStudentsService studentsService;

        public StudentsController(IStudentsService studentsService)
        {
            this.studentsService = studentsService;
        }

        #region POST METHODS
        /// <summary>
        /// Create student in DB
        /// </summary>
        /// <param name="studentViewModel">
        /// Passed parameter is AddStudentViewModel type
        /// </param>
        [HttpPost]
        [Route("add")]
        public async Task Add(AddStudentViewModel studentViewModel)
        {
            await this.studentsService.AddAsync(studentViewModel);
        }

        /// <summary>
        /// Edit student properties
        /// </summary>
        /// <param name="student">
        /// Passed parameter is type EditStudentViewModel and contains the same properties as in AddStudentViewModel.
        /// </param>
        [HttpPost]
        [Route("edit")]
        public async Task Edit(EditStudentViewModel student)
        {
            await this.studentsService.EditAsync(student);
        }

        /// <summary>
        /// Register student to subject. After that student have to finish this course to get credits.
        /// </summary>
        /// <param name="model">
        /// Passed parameter is type EditStudentViewModel and contains properties StudentId and SubjectId
        /// </param>
        [HttpPost]
        [Route("add-subject")]
        public async Task RegisterStudentToSubject(RegisterSubjectViewModel model)
        {
            await this.studentsService.RegisterStudentToSubject(model.StudentId, model.SubjectId);
        }

        /// <summary>
        /// Get a student and a specified subject and set it as finished and student get all credits provided from it
        /// </summary>
        /// <param name="model">
        /// Passed parameter is type MarkSubjectAsFinishedViewModel and contains properties StudentId and SubjectId
        /// </param>
        [HttpPost]
        [Route("mark-subject-as-finished")]
        public async Task МarkSubjectAsSuccessfullyFinished(MarkSubjectAsFinishedViewModel model)
        {
            await this.studentsService.SetSubjectForSuccessfullyFinished(model.StudentId, model.SubjectId);
        }
        #endregion

        #region GET METHODS
        /// <summary>
        /// Get all records from DB
        /// </summary>
        /// <returns>
        /// All students projected to GetStudentViewModel
        /// </returns>
        [HttpGet]
        [Route("get-all")]
        public IEnumerable<GetStudentViewModel> GetAll()
        {
            return this.studentsService
                .GetAll<GetStudentViewModel>()
                .ToList();
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
        public async Task<EditStudentViewModel> GetById(int id)
        {
            return await this.studentsService
                .GetByIdAsync<EditStudentViewModel>(id);
        }

        /// <summary>
        /// Get a student by specified id and all his subjects
        /// </summary>
        /// <param name="id">
        /// Representing a student id
        /// </param>
        /// <returns>
        /// Collection of all stubjects projected to GetStudentSubjectsViewModel
        /// </returns>
        [HttpGet]
        [Route("get-subjects-of-sudent/{id?}")]
        public IEnumerable<GetStudentSubjectsViewModel> GetSubjectsOfStudent(int id)
        {
            return this.studentsService
                .GetStudentFinishedSubjects(id);
        }

        /// <summary>
        /// Get all records from DB and project them to GetStudentViewModel;
        /// </summary>
        /// <returns>
        /// Ordered IEnumerable of students by First name, Last name and finally by the course value
        /// </returns>
        [HttpGet]
        [Route("get-all-ordered")]
        public IEnumerable<GetStudentViewModel> GetAllOrderedByName()
        {
            return this.studentsService.GetAllOrderedByName();
        }

        /// <summary>
        /// Gets all students from DB and subject they are enrolled for
        /// </summary>
        /// <returns>
        /// IEnumerable of students projected to GetAllStudentsAndTheirSubjectsViewModel 
        /// </returns>
        [HttpGet]
        [Route("get-all-students-with-subjects")]
        public IEnumerable<GetAllStudentsAndTheirSubjectsViewModel> GetAllStudentsAndTheirSubjects()
        {
            return this.studentsService.GetAllStundentsAndTheirSubjects();
        }

        /// <summary>
        /// Gets all students from DB and their creadits
        /// </summary>
        /// <returns>
        /// IEnumerable of students projected to GetAllStundentsAndTheirCreditsViewModel 
        /// </returns>
        [HttpGet]
        [Route("get-all-students-with-credits")]
        public IEnumerable<GetAllStundentsAndTheirCreditsViewModel> GetAllStundentsAndTheirCredits()
        {
            return this.studentsService.GetAllStundentsAndTheirCredits();
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
            await this.studentsService.DeleteAsync(id);
        }
        #endregion
    }
}
