using System.Collections.Generic;
using System.Threading.Tasks;
using University.API.Models;
using University.API.ViewModels.Teachers;

namespace University.API.Services.Interfaces
{
    public interface ITeachersService : IBaseService<Teacher, AddTeacherViewModel, EditTeacherViewModel>
    {
        IEnumerable<GetTeacherIdAndNameViewModel> GetAllWithIdAndName();
        IEnumerable<GetAllWithSubjectsCountViewModel> GetAllWithSubjectsCount();
        IEnumerable<GetAllSubjectsAndEnrolledStundentsCountViewModel> GetAllSubjectsAndEnrolledStundentsCount();
        IEnumerable<GetTopThreeMostPreferredViewModel> GetTopThreeMostPreferred();
        Task RegisterSubjectToTeacher(int teacherId, int subjectId);
    }
}
