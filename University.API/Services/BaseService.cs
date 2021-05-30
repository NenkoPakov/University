using AutoMapper;
using System;
using System.Linq;
using System.Threading.Tasks;
using University.API.Data.Common;
using University.API.Services.Interfaces;

namespace University.API.Services
{
    /// <summary>
    /// This class provides base functionality which is used in all services. It contains methods like AddAsync, GetByIdAsync, GetAll, DeleteAsync and EditAsync.
    /// It is inharited by all services and use types specified within a his implementation.
    /// TEntity is class which represent classes in Model folder.
    /// TCreteViewModel is class which represent ViewModel classes resposible for creation of TEntity.
    /// TEditViewModel is class which represent ViewModel classes resposible for edit of TEntity.
    /// </summary>

    public class BaseService<TEntity, TCreteViewModel, TEditViewModel> : IBaseService<TEntity, TCreteViewModel, TEditViewModel>
        where TEntity : class
        where TCreteViewModel : class
        where TEditViewModel : class
    {

        protected IRepository<TEntity> EntityRepository { get; }
        protected readonly IMapper mapper;

        public BaseService(IRepository<TEntity> entityRepository, IMapper mapper)
        {
            this.EntityRepository = entityRepository;
            this.mapper = mapper;
        }

        /// <summary>
        /// This method is asynchronous and it is responsible for creation of entity in DB
        /// </summary>
        /// <param name="entityViewModel">
        /// Passed parameter is TCreteViewModel type
        /// </param>
        public virtual async Task AddAsync(TCreteViewModel entityViewModel)
        {
            TEntity entity = this.mapper.Map<TEntity>(entityViewModel);

            await this.EntityRepository.AddAsync(entity);
            await this.EntityRepository.SaveChangesAsync();
        }

        /// <summary>
        /// This method gets a TEntity with specified id from his table in DB;
        /// </summary>
        /// <typeparam name="T">
        /// T is ViewModel class which is used for mapping from original entity type to specified type
        /// </typeparam>
        /// <param name="id">
        /// Representing a entity id
        /// </param>
        /// <returns>
        /// Returns the entity mapped to T type
        /// </returns>
        public async Task<T> GetByIdAsync<T>(int id)
        {
            return this.mapper.Map<T>(await this.EntityRepository.FindAsync(id));
        }

        /// <summary>
        /// Get all records from the table responsible for this entity type from DB
        /// </summary>
        /// <returns>
        /// IQueryable of entities projected to TEntity type
        /// </returns>
        public IQueryable<TEntity> GetAll()
        {
            return this.EntityRepository.All();
        }

        /// <summary>
        /// Get all records from the table responsible for this entity type from DB
        /// </summary>
        /// <typeparam name="T">
        /// T is ViewModel class which is used for projectinf from colection of original entity type to colection of specified type
        /// </typeparam>
        /// <returns>
        /// IQueryable of entities projected to T type
        /// </returns>
        public IQueryable<T> GetAll<T>()
        {
            return this.mapper
                .ProjectTo<T>(this.EntityRepository.All());
        }


        /// <summary>
        /// This method gets entity by specified id end then delete it
        /// </summary>
        /// <param name="id">
        /// Representing a entity id
        /// </param>
        public virtual async Task<TEntity> DeleteAsync(int id)
        {
            TEntity entity = await EntityRepository.FindAsync(id);

            if (entity == null)
            {
                throw new ArgumentException($"Does not exist {nameof(TEntity).ToLower()} with id = {id}");
            }

            this.EntityRepository.Delete(entity);
            await this.EntityRepository.SaveChangesAsync();

            return entity;
        }

        /// <summary>
        /// This method edits properties of his original entity.
        /// </summary>
        /// <param name="entityViewModel">
        /// Parameter entityViewModel contains all properties with their changes
        /// </param>
        public async Task<IRepository<TEntity>> EditAsync(TEditViewModel entityViewModel)
        {
            TEntity entity = this.mapper.Map<TEntity>(entityViewModel);

            this.EntityRepository.Update(entity);
            await this.EntityRepository.SaveChangesAsync();

            return this.EntityRepository;
        }
    }
}
