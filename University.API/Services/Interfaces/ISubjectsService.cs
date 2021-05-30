using System.Collections.Generic;
using System.Threading.Tasks;
using University.API.Models;
using University.API.ViewModels.Subjects;

namespace University.API.Services.Interfaces
{
    public interface ISubjectsService : IBaseService<Subject, AddSubjectViewModel, EditSubjectViewModel>
    {
        IEnumerable<GetSubjectIdAndName> GetSubjectsWithoutTeacher();
        IEnumerable<GetSubjectIdAndName> GetAllUnenrolledSubjects(IEnumerable<int> enrolledSubjects);
        IEnumerable<GetTopThreeMostAttendedViewModel> GetTopThreeMostAttended();

    }
}
