const PersonValidations = ({ firstName, secondName, lastName }, errors) => {
    if (!firstName.trim()) {
        errors.firstName = "Firstname is required"
    } else if (firstName.length > 30) {
        errors.firstName = "Firstname max length is 30 characters"
    }

    if (secondName.length > 30) {
        errors.secondName = "Secondname max length is 30 characters"
    }

    if (!lastName.trim()) {
        errors.lastName = "Lastname is required"
    } else if (lastName.length > 30) {
        errors.lastName = "Lastname max length is 30 characters"
    }
}

const StudentValidations = ({ personId, course }, errors) => {
    if (!personId) {
        errors.personId = "You must select a person"
    }

    if (!course) {
        errors.course = "Course is required"
    } else if (course <= 0 || course > 6) {
        errors.course = "Course must be between 1 and 6"
    }
}

const TeacherValidations = ({ personId, title }, errors) => {
    if (!personId) {
        errors.personId = "You must select a person"
    }
    const validTitles = ['асистент', 'главен асистент', 'преподавател', 'старши преподавател', 'доцент', 'професор'];

    if (!title) {
        errors.title = "Title is required"
    } else if (!validTitles.includes(title)) {
        errors.title = "Invalid title"
    }
}

const SubjectValidations = ({ name, teacherId, credits }, errors) => {
    if (!name.trim()) {
        errors.name = "Name is required"
    } else if (name.length > 30) {
        errors.name = "Name max length is 30 characters"
    }

    if (teacherId < 0) {
        errors.teacherId = "Teacher id can not be negativ number"
    }

    if (!credits) {
        errors.credits = "Credits is required"
    } else if (credits <= 0 || credits > 100) {
        errors.credits = "Credits must be between 1 and 100"
    }
}

export default function validateInfo(entity, values) {
    let errors = {};

    entity === "Students"
        ? StudentValidations(values, errors)
        : entity === "Teachers"
            ? TeacherValidations(values, errors)
            : entity === "Subjects"
                ? SubjectValidations(values, errors)
                : PersonValidations(values, errors)

    return errors;
}