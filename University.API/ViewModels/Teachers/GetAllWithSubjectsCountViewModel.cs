using System.Text.Json.Serialization;

namespace University.API.ViewModels.Teachers
{
    public class GetAllWithSubjectsCountViewModel
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

        [JsonPropertyName("Subjects count")]
        public int SubejctsCount { get; set; }
    }
}
