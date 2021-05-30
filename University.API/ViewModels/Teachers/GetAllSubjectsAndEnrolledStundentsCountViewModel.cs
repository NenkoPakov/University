using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace University.API.ViewModels.Teachers
{
    public class GetAllSubjectsAndEnrolledStundentsCountViewModel
    {
        public int Id { get; set; }

        [JsonPropertyName("First name")]
        public string PersonFirstName { get; set; }

        [JsonPropertyName("Second name")]
        public string PersonSecondName { get; set; }

        [JsonPropertyName("Last name")]
        public string PersonLastName { get; set; }

        [JsonPropertyName("Title")]
        public string Title { get; set; }

        [JsonPropertyName("Subjects")]
        public ICollection<string> Subjects { get; set; }

        [JsonPropertyName("Enrolled students")]
        public int StudentsCount { get; set; }

    }
}
