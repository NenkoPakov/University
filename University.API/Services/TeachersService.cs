using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using University.API.Data.Common;
using University.API.Models;
using University.API.Services.Interfaces;
using University.API.ViewModels.Teachers;

namespace University.API.Services
{
    /// <summary>
    /// This class provides all methods which are used within the Teachers controller.They are doing specific operations with Teachers.
    /// This class inherit BaseService class which contains all majour logic like Add, Edit, Delete, GetAll and GetById.
    /// It is using major the Students repository and is some cases the Subjects repository.
    /// Each of services classes is using mapper which helps for tranformation of original entity to target view model without any lines of code.
    /// </summary>

    public class TeachersService : BaseService<Teacher, AddTeacherViewModel, EditTeacherViewModel>, ITeachersService
    {

        protected IRepository<Subject> SubjectsRepository { get; }

        public TeachersService(IRepository<Teacher> entityRepository, IRepository<Subject> subjectsRepository, IMapper mapper)
            : base(entityRepository, mapper)
        {
            this.SubjectsRepository = subjectsRepository;
        }

        /// <summary>
        /// Gets all teachers from Teachers table in DB then project them to GetTeacherIdAndNameViewModel
        /// </summary>
        /// <returns>
        /// IEnumerable of teachers projected to GetTeacherIdAndNameViewModel 
        /// </returns>
        public IEnumerable<GetTeacherIdAndNameViewModel> GetAllWithIdAndName()
        {
            return base.GetAll<GetTeacherIdAndNameViewModel>()
                    .ToList();
        }

        /// <summary>
        /// This method gets all teachers and count of subjects they are leading.
        /// Then order the collection ascending by FirstName, LastName and descending bu Subjects count.
        /// </summary>
        /// <returns>
        /// IEnumerable of all teachers projected to GetAllWithSubjectsCountViewModel
        /// </returns>
        public IEnumerable<GetAllWithSubjectsCountViewModel> GetAllWithSubjectsCount()
        {
            return base.GetAll<GetAllWithSubjectsCountViewModel>()
                .OrderBy(t => t.PersonFirstName)
                .ThenBy(t => t.PersonLastName)
                .ThenByDescending(t => t.SubejctsCount)
                .ToList();
        }

        /// <summary>
        /// This method gets all teachers and all subject names they lead and count of students in them
        /// </summary>
        /// <returns>
        /// IEnumerable of all teachers projected to GetAllSubjectsAndEnrolledStundentsCountViewModel
        /// </returns>
        public IEnumerable<GetAllSubjectsAndEnrolledStundentsCountViewModel> GetAllSubjectsAndEnrolledStundentsCount()
        {
            return base.GetAll<GetAllSubjectsAndEnrolledStundentsCountViewModel>()
                .ToList();
        }

        /// <summary>
        /// This method gets the teachers whit students count in their subjects. Then order them by students count and get top 3 records. 
        /// </summary>
        /// <returns>
        /// Top 3 most preferred teachers projected to GetTopThreeMostPreferredViewModel
        /// </returns>
        public IEnumerable<GetTopThreeMostPreferredViewModel> GetTopThreeMostPreferred()
        {
            return base.GetAll<GetTopThreeMostPreferredViewModel>()
                .OrderByDescending(t => t.EnrolledStudentsCount)
                .Take(3);
        }


        /// <summary>
        /// Register a teacher to subject. First check whether specified teacher and subject exists and then set this teacher to student.
        /// </summary>
        /// <param name="teacherId">
        /// Representing a teacher id
        /// </param>
        /// <param name="subjectId">
        /// Representing a subject id
        /// </param>
        public async Task RegisterSubjectToTeacher(int teacherId, int subjectId)
        {
            Teacher teacher = await base.EntityRepository.FindAsync(teacherId);
            Subject subject = await this.SubjectsRepository.FindAsync(subjectId);

            if (teacher == null && subject == null)
            {
                throw new ArgumentException($"Does not exist {nameof(Teacher).ToLower()} with id = {teacherId} and {nameof(Subject).ToLower()} with id = {subjectId}");
            }
            else if (teacher == null)
            {
                throw new ArgumentException($"Does not exist {nameof(Teacher).ToLower()} with id = {teacherId}");
            }
            else if (subject == null)
            {
                throw new ArgumentException($"Does not exist {nameof(Subject).ToLower()} with id = {subjectId}");
            }

            teacher.Subjects.Add(subject);
            subject.TeacherId = teacherId;
            subject.Teacher = teacher;

            await base.EntityRepository.SaveChangesAsync();
        }

        /// <summary>
        /// This method gets teacher with specified id and all his subject. Then firstable set all subjects which he was leading
        /// with value null table and after that deletes teacher from Teachers table in DB.
        /// </summary>
        /// <param name="id">
        /// Representing a teacher id
        /// </param>
        public async override Task<Teacher> DeleteAsync(int id)
        {
            ICollection<Subject> subjects = this.GetAll()
                   .Where(s => s.Id == id)
                   .Select(s => s.Subjects)
                   .FirstOrDefault();

            foreach (var subject in subjects)
            {
                subject.TeacherId = null;
            }

            return await base.DeleteAsync(id);
        }
    }
}
