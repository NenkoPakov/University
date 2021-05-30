using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using University.API.Data.Common;
using University.API.Models;
using University.API.Services.Interfaces;
using University.API.ViewModels.Subjects;

namespace University.API.Services
{
    /// <summary>
    /// This class provides all methods which are used within the Subjects controller.They are doing specific operations with Subjects.
    /// This class inherit BaseService class which contains all majour logic like Add, Edit, Delete, GetAll and GetById.
    /// It is using major the Students repository and is some cases the Student repository.
    /// Each of services classes is using mapper which helps for tranformation of original entity to target view model without any lines of code.
    /// </summary>

    public class SubjectsService : BaseService<Subject, AddSubjectViewModel, EditSubjectViewModel>, ISubjectsService
    {

        public IRepository<StudentSubject> StudentsSubjectsRepository { get; }

        public SubjectsService(IRepository<Subject> entityRepository, IRepository<StudentSubject> studentsSubjectsRepository, IMapper mapper)
            : base(entityRepository, mapper)
        {
            this.StudentsSubjectsRepository = studentsSubjectsRepository;
        }

        /// <summary>
        /// This method gets all subject with do not have assigned teacher
        /// </summary>
        /// <returns>
        /// IEnumerable of subjects projected to GetSubjectIdAndName
        /// </returns>
        public IEnumerable<GetSubjectIdAndName> GetSubjectsWithoutTeacher()
        {
            IQueryable<Subject> subjects = base.EntityRepository.All().Where(subject => subject.TeacherId == null);
            return base.mapper.ProjectTo<GetSubjectIdAndName>(subjects).ToList();
        }

        /// <summary>
        /// Gets all subjects and returns only these which are not in collection of enrolled subject passed as parameter
        /// </summary>
        /// <param name="enrolledSubjects">
        /// Represent IEnumerable of ids of all enrolled subject of target student
        /// </param>
        /// <returns>
        /// IEnumerable of subjects projected to GetSubjectIdAndName
        /// </returns>
        public IEnumerable<GetSubjectIdAndName> GetAllUnenrolledSubjects(IEnumerable<int> enrolledSubjects)
        {
            IQueryable<Subject> subjects = base.EntityRepository.All().Where(subject => !enrolledSubjects.Contains(subject.Id));
            return base.mapper.ProjectTo<GetSubjectIdAndName>(subjects).ToList();
        }

        /// <summary>
        /// This method gets the subjects with the most students count
        /// </summary>
        /// <returns>
        /// Top 3 most attended subject projected to GetTopThreeMostAttendedViewModel
        /// </returns>
        public IEnumerable<GetTopThreeMostAttendedViewModel> GetTopThreeMostAttended()
        {
            return base.GetAll<GetTopThreeMostAttendedViewModel>()
                .OrderByDescending(x => x.StudentsCount)
                .Take(3);
        }

        /// <summary>
        /// Delete subject with specified id
        /// </summary>
        /// <param name="id">
        /// Representing a subject id
        /// </param>
        public override async Task<Subject> DeleteAsync(int id)
        {
            ICollection<StudentSubject> subjectStudents = this.GetAll()
                .Where(s => s.Id == id)
                .Select(s => s.SubjectStudents)
                .FirstOrDefault();

            foreach (var subjectStudent in subjectStudents)
            {
                StudentSubject ss = await this.StudentsSubjectsRepository.FindAsync(subjectStudent.StudentId, subjectStudent.SubjectId);
                this.StudentsSubjectsRepository.Delete(ss);
            }

            return await base.DeleteAsync(id);
        }
    }
}
