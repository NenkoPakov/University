const rootUrl = "https://localhost:44379"

export const TabsData = {
    People: {
        title: 'People',
        add: {
            firstName: {
                label: "First name",
                type: "text"
            },
            secondName: {
                label: "Second name",
                type: "text"
            },
            lastName: {
                label: "Last name",
                type: "text"
            }
        },
        subTabs: {
            GetAll: {
                label: "All",
                url: `${rootUrl}/people/get-all`,
            }
        }
    },
    Students: {
        title: 'Students',
        add: {
            personId: {
                label: "Person id",
                type: "select-one",
                url: `${rootUrl}/people/get-all-with-id-and-name`,
            },
            course: {
                label: "Course",
                type: "select-one",
                values: [1, 2, 3, 4, 5, 6]
            }
        },
        "add-subject": {
            subjectId: {
                label: "Subject id",
                type: "select-multiple",
                url: `${rootUrl}/subjects/get-all-unenrolled-subjects`,
            }
        },
        "mark-subject-as-finished": {
            subjectId: {
                label: "Select subject",
                type: "select-multiple",
                url: `${rootUrl}/students/get-subjects-of-sudent`,
            }
        },
        subTabs: {
            GetAll: {
                label: "All",
                url: `${rootUrl}/students/get-all`,
            },
            Ordered: {
                label: "All ordered",
                url: `${rootUrl}/students/get-all-ordered`,
            },
            WithSubjects: {
                label: "Students and enrolled subjects",
                url: `${rootUrl}/students/get-all-students-with-subjects`,
            },
            WithCredits: {
                label: "Students and their credits",
                url: `${rootUrl}/students/get-all-students-with-credits`,
            }
        }
    },
    Teachers: {
        title: 'Teachers',
        add: {
            personId: {
                label: "Person id",
                type: "select-one",
                url: `${rootUrl}/people/get-all-with-id-and-name`,
            },
            title: {
                label: "Title",
                type: "select-one",
                values: ['асистент', 'главен асистент', 'преподавател', 'старши преподавател', 'доцент', 'професор']
            }
        },
        "set-subject-to-teacher": {
            subjectId: {
                label: "Select subject",
                type: "select-multiple",
                url: `${rootUrl}/subjects/get-subjects-without-teacher`,
            }
        },
        subTabs: {
            GetAll: {
                label: "All",
                url: `${rootUrl}/teachers/get-all`,
            },
            WithSubjects: {
                label: "Teachers and their subjects",
                url: `${rootUrl}/teachers/get-all-with-subjects-count`,
            },
            WithStudentsCount: {
                label: "Teachers and enrolled students",
                url: `${rootUrl}/teachers/get-all-teachers-with-subjects-and-students-count`,
            },
            Top3: {
                label: "Top 3 most attended",
                url: `${rootUrl}/teachers/get-top-3-most-preferred`,
            }
        }
    },
    Subjects: {
        title: 'Subjects',
        add: {
            name: {
                label: "Subject name",
                type: "text"
            },
            teacherId: {
                label: "Teacher id",
                type: "select-one",
                url: `${rootUrl}/teachers/get-all-with-id-and-name`,
            },
            credits: {
                label: "Credits",
                type: "number"
            }
        },
        subTabs: {
            GetAll: {
                label: "All",
                url: `${rootUrl}/subjects/get-all`,
            },
            Top3: {
                label: "Top 3 most attended",
                url: `${rootUrl}/subjects/get-top-3-most-attended`,
            }
        }
    }
}