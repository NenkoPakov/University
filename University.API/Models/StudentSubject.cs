namespace University.API.Models
{
    public partial class StudentSubject
    {
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public bool IsSuccessfullyFinished { get; set; }

        public virtual Student Student { get; set; }
        public virtual Subject Subject { get; set; }
    }
}
