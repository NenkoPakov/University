using System.Text.Json.Serialization;

namespace University.API.ViewModels.Subjects
{
    public class GetTopThreeMostAttendedViewModel
    {
        public int Id { get; set; }

        [JsonPropertyName("Name")]
        public string Name { get; set; }

        [JsonPropertyName("Enrolled students")]
        public int StudentsCount { get; set; }
    }
}
