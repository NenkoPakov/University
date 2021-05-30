using System.Linq;
using System.Threading.Tasks;
using University.API.Data.Common;

namespace University.API.Services.Interfaces
{
    public interface IBaseService<TEntity, TCreteViewModel, TEditViewModel>
        where TEntity : class
        where TCreteViewModel : class
        where TEditViewModel : class
    {
        Task AddAsync(TCreteViewModel entityViewModel);
        Task<T> GetByIdAsync<T>(int id);
        IQueryable<TEntity> GetAll();
        IQueryable<T> GetAll<T>();
        Task<IRepository<TEntity>> EditAsync(TEditViewModel entityViewModel);
        Task<TEntity> DeleteAsync(int id);
    }
}
