using System;
using System.Collections.Generic;

#nullable disable

namespace University.API.Models
{
    public partial class Subject
    {
        public Subject()
        {
            this.SubjectStudents = new HashSet<StudentSubject>();
        }

        private int credits;

        public int Id { get; set; }
        public string Name { get; set; }
        public int? TeacherId { get; set; }
        public int Credits
        {
            get { return credits; }
            set
            {
                if (value <= 0)
                {
                    throw new ArgumentException("Credits must be positiv number");
                }
                credits = value;
            }
        }

        public virtual Teacher Teacher { get; set; }
        public virtual ICollection<StudentSubject> SubjectStudents { get; set; }
    }
}
