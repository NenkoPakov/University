using System.Text.Json.Serialization;

namespace University.API.ViewModels.Students
{
    public class GetStudentViewModel
    {
        public int Id { get; set; }

        [JsonPropertyName("First name")]
        public string PersonFirstName { get; set; }

        [JsonPropertyName("Second name")]
        public string PersonSecondName { get; set; }

        [JsonPropertyName("Last name")]
        public string PersonLastName { get; set; }

        [JsonPropertyName("Course")]
        public int Course { get; set; }
    }
}
