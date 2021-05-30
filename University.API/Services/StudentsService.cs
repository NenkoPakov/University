using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using University.API.Data.Common;
using University.API.Models;
using University.API.Services.Interfaces;
using University.API.ViewModels.Students;

namespace University.API.Services
{
    /// <summary>
    /// This class provides all methods which are used within the Students controller.They are doing specific operations with Students.
    /// This class inherit BaseService class which contains all majour logic like Add, Edit, Delete, GetAll and GetById.
    /// It is using major the Students repository and is some cases the Subject and the Student repositories.
    /// Each of services classes is using mapper which helps for tranformation of original entity to target view model without any lines of code.
    /// </summary>

    public class StudentsService : BaseService<Student, AddStudentViewModel, EditStudentViewModel>, IStudentsService
    {
        protected IRepository<Person> PeopleRepository { get; }
        protected IRepository<Subject> SubjectsRepository { get; }
        protected IRepository<StudentSubject> StudentsSubjectsRepository { get; }

        public StudentsService(IRepository<Student> entityRepository,IRepository<Person> PeopleRepository, IRepository<Subject> subjectsRepository, IRepository<StudentSubject> studentsSubjectsRepository, IMapper mapper)
            : base(entityRepository, mapper)
        {
            this.SubjectsRepository = subjectsRepository;
            this.StudentsSubjectsRepository = studentsSubjectsRepository;
        }


        /// <summary>
        /// Gets all records from Students table in DB and returns them projected to GetStudentViewModel
        /// and ordered ascending by FistName,LastName and then descending by course value
        /// </summary>
        /// <returns>
        /// IEnumerable of students projected to GetStudentViewModel
        /// </returns>
        public IEnumerable<GetStudentViewModel> GetAllOrderedByName()
        {
            return base.GetAll<GetStudentViewModel>()
                .OrderBy(s => s.PersonFirstName)
                .ThenBy(s => s.PersonLastName)
                .ThenByDescending(s => s.Course)
                .ToList();
        }

        /// <summary>
        /// Get all records for specified stident which are finished successefully from StudentsSubjects table in DB
        /// </summary>
        /// <param name="studentId">
        /// Representing a student id
        /// </param>
        /// <returns>
        /// IEnumerable of finished subjects of target student projected to GetStudentSubjectsViewModel
        /// </returns>
        public IEnumerable<GetStudentSubjectsViewModel> GetStudentFinishedSubjects(int studentId)
        {
            IQueryable<StudentSubject> studentSubjects = this.StudentsSubjectsRepository.All().Where(student => student.StudentId == studentId && student.IsSuccessfullyFinished == false);
            return base.mapper.ProjectTo<GetStudentSubjectsViewModel>(studentSubjects).ToList();
        }

        /// <summary>
        /// Get all records for specified stident from StudentsSubjects table in DB
        /// </summary>
        /// <param name="studentId">
        /// Representing a student id
        /// </param>
        /// <returns>
        /// IEnumerable of all subjects of target student projected to GetStudentSubjectsViewModel
        /// </returns>
        public IEnumerable<GetStudentSubjectsViewModel> GetStudentSubjects(int studentId)
        {
            IQueryable<StudentSubject> studentSubjects = this.StudentsSubjectsRepository.All().Where(student => student.StudentId == studentId);
            return base.mapper.ProjectTo<GetStudentSubjectsViewModel>(studentSubjects).ToList();
        }

        /// <summary>
        /// Gets all students from DB and subject they are enrolled for
        /// </summary>
        /// <returns>
        /// IEnumerable of students projected to GetAllStudentsAndTheirSubjectsViewModel 
        /// </returns>
        public IEnumerable<GetAllStudentsAndTheirSubjectsViewModel> GetAllStundentsAndTheirSubjects()
        {
            return base.GetAll<GetAllStudentsAndTheirSubjectsViewModel>()
                .ToList();
        }

        /// <summary>
        /// Gets all students from DB and their creadits
        /// </summary>
        /// <returns>
        /// IEnumerable of students projected to GetAllStundentsAndTheirCreditsViewModel 
        /// </returns>
        public IEnumerable<GetAllStundentsAndTheirCreditsViewModel> GetAllStundentsAndTheirCredits()
        {
            return base.GetAll<GetAllStundentsAndTheirCreditsViewModel>()
                .ToList();
        }

        /// <summary>
        /// Register a student to subject. First check whether specified student and subject exists and then set this subject to student
        /// and mark it as unfinished. After that the student have to finish this course to get credits.
        /// </summary>
        /// <param name="studentId">
        /// Representing a student id
        /// </param>
        /// <param name="subjectId">
        /// Representing a subject id
        /// </param>
        public async Task RegisterStudentToSubject(int studentId, int subjectId)
        {
            Student student = await this.EntityRepository.FindAsync(studentId);
            Subject subject = await this.SubjectsRepository.FindAsync(subjectId);

            if (student == null && subject == null)
            {
                throw new ArgumentException($"Does not exist {nameof(Student).ToLower()} with id = {studentId} and {nameof(Subject).ToLower()} with id = {subjectId}");
            }
            else if (student == null)
            {
                throw new ArgumentException($"Does not exist {nameof(Student).ToLower()} with id = {studentId}");
            }
            else if (subject == null)
            {
                throw new ArgumentException($"Does not exist {nameof(Subject).ToLower()} with id = {subjectId}");
            }

            StudentSubject studentSubject = new StudentSubject();
            studentSubject.Subject = subject;
            studentSubject.Student = student;
            studentSubject.StudentId = studentId;
            studentSubject.SubjectId = subjectId;
            studentSubject.IsSuccessfullyFinished = false;
            await this.StudentsSubjectsRepository.AddAsync(studentSubject);

            student.StudentSubjects.Add(studentSubject);
            await base.EntityRepository.SaveChangesAsync();
            await this.StudentsSubjectsRepository.SaveChangesAsync();
        }


        /// <summary>
        /// First checks for record in StudentsSubjects table in DB and if exists mark the subject as finished.
        /// </summary>
        /// <param name="studentId">
        /// Representing a student id
        /// </param>
        /// <param name="subjectId">
        /// Representing a subject id
        /// </param>
        public async Task SetSubjectForSuccessfullyFinished(int studentId, int subjectId)
        {
            StudentSubject studentSubject = await this.StudentsSubjectsRepository.FindAsync(studentId, subjectId);

            if (studentSubject == null)
            {
                throw new ArgumentException($"Student is not enrolled for subject with id = {subjectId}");
            }

            studentSubject.IsSuccessfullyFinished = true;
            await base.EntityRepository.SaveChangesAsync();
        }

        /// <summary>
        /// This method gets student with specified id and all his subject. Then firstable delete all records from StudentsSubjects table
        /// and then deletes student from Students table in DB.
        /// </summary>
        /// <param name="id">
        /// Representing a student id
        /// </param>
        public async override Task<Student> DeleteAsync(int id)
        {
            ICollection<StudentSubject> studentSubjects = this.GetAll()
                .Where(s => s.Id == id)
                .Select(s => s.StudentSubjects)
                .FirstOrDefault();

            foreach (var studentSubject in studentSubjects)
            {
                StudentSubject ss = await this.StudentsSubjectsRepository.FindAsync(studentSubject.StudentId, studentSubject.SubjectId);
                this.StudentsSubjectsRepository.Delete(ss);
            }

            return await base.DeleteAsync(id);
        }
    }
}
