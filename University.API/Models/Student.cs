using System;
using System.Collections.Generic;

#nullable disable

namespace University.API.Models
{
    public partial class Student
    {
        public Student()
        {
            this.StudentSubjects = new HashSet<StudentSubject>();
        }

        private int course;

        public int Id { get; set; }
        public int PersonId { get; set; }
        public int Course
        {
            get { return course; }
            set
            {
                if (value < 1 || value > 6)
                {
                    throw new ArgumentException("Course must be between 1 and 6");
                }

                course = value;
            }
        }

        public virtual Person Person { get; set; }
        public virtual ICollection<StudentSubject> StudentSubjects { get; set; }
    }
}
