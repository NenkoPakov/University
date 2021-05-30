using System.Collections.Generic;
using System.Threading.Tasks;
using University.API.Models;
using University.API.ViewModels.Students;

namespace University.API.Services.Interfaces
{
    public interface IStudentsService : IBaseService<Student, AddStudentViewModel, EditStudentViewModel>
    {
        IEnumerable<GetStudentViewModel> GetAllOrderedByName();
        IEnumerable<GetStudentSubjectsViewModel> GetStudentFinishedSubjects(int studentId);
        IEnumerable<GetStudentSubjectsViewModel> GetStudentSubjects(int studentId);
        IEnumerable<GetAllStudentsAndTheirSubjectsViewModel> GetAllStundentsAndTheirSubjects();
        IEnumerable<GetAllStundentsAndTheirCreditsViewModel> GetAllStundentsAndTheirCredits();
        Task RegisterStudentToSubject(int studentId, int subjectId);
        Task SetSubjectForSuccessfullyFinished(int studentId, int subjectId);
    }
}
