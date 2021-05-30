using System;
using System.Collections.Generic;

#nullable disable

namespace University.API.Models
{
    public partial class Teacher
    {
        public Teacher()
        {
            Subjects = new HashSet<Subject>();
        }

        private string title;

        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Title
        {
            get { return title; }
            set
            {
                ICollection<string> allowedTitles = new string[] {
                    "асистент",
                    "главен асистент",
                    "преподавател",
                    "старши преподавател",
                    "доцент",
                    "професор"
                };

                if (!allowedTitles.Contains(value))
                {
                    throw new ArgumentException("Invalid title!");
                }

                title = value;
            }
        }

        public virtual Person Person { get; set; }

        public virtual ICollection<Subject> Subjects { get; set; }
    }
}
