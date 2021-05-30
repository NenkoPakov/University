using AutoMapper;
using System.Linq;
using University.API.Models;
using University.API.ViewModels.People;
using University.API.ViewModels.Students;
using University.API.ViewModels.Subjects;
using University.API.ViewModels.Teachers;

namespace University.API.Data.Common
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region People
            CreateMap<Person, AddPersonViewModel>();
            CreateMap<AddPersonViewModel, Person>();
            CreateMap<EditPersonViewModel, Person>();
            CreateMap<Person, EditPersonViewModel>();
            CreateMap<Person, GetPersonViewModel>();
            CreateMap<Person, GetPeopleIdAndNameViewModel>().ForMember(
                    m => m.Name,
                    opt => opt.MapFrom(p => string.Join(" ", p.FirstName, p.SecondName, p.LastName).Trim()));
            #endregion

            #region Students
            CreateMap<Student, AddStudentViewModel>();
            CreateMap<AddStudentViewModel, Student>();
            CreateMap<Student, GetStudentViewModel>();
            CreateMap<EditStudentViewModel, Student>();
            CreateMap<Student, EditStudentViewModel>();

            CreateMap<StudentSubject, GetStudentSubjectsViewModel>().ForMember(
                m => m.Name,
                    opt => opt.MapFrom(s => s.Subject.Name)
                )
                .ForMember(
                m => m.Id,
                    opt => opt.MapFrom(s => s.Subject.Id)
                );

            CreateMap<Student, GetAllStudentsAndTheirSubjectsViewModel>()
                .ForMember(
                    m => m.SubjectsNames,
                    opt => opt.MapFrom(student => student.StudentSubjects.Select(ss => ss.Subject.Name)));

            CreateMap<Student, GetAllStundentsAndTheirCreditsViewModel>()
                .ForMember(
                    m => m.Credits,
                    opt => opt.MapFrom(student => student.StudentSubjects.Where(ss => ss.IsSuccessfullyFinished == true).Sum(ss => ss.Subject.Credits)));
            #endregion

            #region Teachers
            CreateMap<Teacher, AddTeacherViewModel>();
            CreateMap<AddTeacherViewModel, Teacher>();
            CreateMap<Teacher, GetTeacherViewModel>();
            CreateMap<EditTeacherViewModel, Teacher>();
            CreateMap<Teacher, EditTeacherViewModel>();

            CreateMap<Teacher, GetTeacherIdAndNameViewModel>().ForMember(
                    m => m.Name,
                    opt => opt.MapFrom(t => string.Join(" ", t.Person.FirstName, t.Person.SecondName, t.Person.LastName).Trim()));

            CreateMap<Teacher, GetAllSubjectsAndEnrolledStundentsCountViewModel>().ForMember(
                    m => m.Subjects,
                    opt => opt.MapFrom(teacher => teacher.Subjects.Select(x => x.Name)))
                .ForMember(
                    m => m.StudentsCount,
                    opt => opt.MapFrom(teacher => teacher.Subjects.SelectMany(x => x.SubjectStudents).Count()));

            CreateMap<Teacher, GetTopThreeMostPreferredViewModel>().ForMember(
                    m => m.EnrolledStudentsCount,
                    opt => opt.MapFrom(teacher => teacher.Subjects.SelectMany(x => x.SubjectStudents).Count()));

            CreateMap<Teacher, GetAllWithSubjectsCountViewModel>().ForMember(
                    m => m.SubejctsCount,
                    opt => opt.MapFrom(teacher => teacher.Subjects.Count()));
            #endregion

            #region Subjects
            CreateMap<Subject, AddSubjectViewModel>();
            CreateMap<EditSubjectViewModel, Subject>();
            CreateMap<Subject, EditSubjectViewModel>();
            CreateMap<Subject, GetSubjectIdAndName>();
            CreateMap<Subject, GetSubjectIdAndName>();

            CreateMap<AddSubjectViewModel, Subject>().ForMember(
                m => m.TeacherId,
                    opt => opt.MapFrom(s => s.TeacherId == null || s.TeacherId <= 0 ? null : s.TeacherId));

            CreateMap<Subject, GetSubjectViewModel>()
                .ForMember(
                    m => m.Teacher,
                    opt => opt.MapFrom(s => string.Join(" ", s.Teacher.Person.FirstName, s.Teacher.Person.SecondName, s.Teacher.Person.LastName).Trim()));

            CreateMap<Subject, GetTopThreeMostAttendedViewModel>().ForMember(
                    m => m.StudentsCount,
                    opt => opt.MapFrom(subject => subject.SubjectStudents.Count()));

            #endregion
        }
    }
}
