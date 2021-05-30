namespace University.API.ViewModels.Subjects
{
    public partial class AddSubjectViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? TeacherId { get; set; }
        public string Credits { get; set; }
    }
}
