using System.Text.Json.Serialization;

namespace University.API.ViewModels.Subjects
{
    public class GetSubjectViewModel
    {
        public int Id { get; set; }

        [JsonPropertyName("Name")]
        public string Name { get; set; }

        [JsonPropertyName("Teacher")]
        public string Teacher { get; set; }

        [JsonPropertyName("Credits")]
        public int Credits { get; set; }
    }
}
