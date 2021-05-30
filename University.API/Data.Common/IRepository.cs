using System;
using System.Linq;
using System.Threading.Tasks;

namespace University.API.Data.Common
{
    public interface IRepository<TEntity> : IDisposable
        where TEntity : class
    {
        IQueryable<TEntity> All();
        Task AddAsync(TEntity entity);
        Task<TEntity> FindAsync(params object[] keyValues);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        Task<int> SaveChangesAsync();
    }
}
