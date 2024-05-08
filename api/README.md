# My API

## Overview
This API provides endpoints for managing students.

## Endpoints

### GET /students
Returns a list of all students.

#### Parameters
None

#### Response
```json
[
  {
    "id": 1,
    "firstName": "Marty",
    "lastName": "McFly",
    "email": "marty.mcfly@example.com",
    "major": "History",
    "averageGrade": 85.5
  },
  {
    "id": 2,
    "firstName": "Emmett",
    "lastName": "Brown",
    "email": "emmett.brown@example.com",
    "major": "Physics",
    "averageGrade": 90.0
  }
]

```

### POST /students
Creates a new student.

#### Parameters
- firstName (string, required): The student's first name.
- lastName (string, required): The student's last name.
- email (string, required): The student's email address.
- major (string, required): The student's major.
- averageGrade (number, required): The student's average grade.

#### Response
Status code 204 (No Content) if successful. Message in console that student was successfully created.

### Delete /students
Deletes a student.

#### Parameters
- firstName (string, required): The student's first name.
- lastName (string, required): The student's last name.
- email (string, required): The student's email address.
- major (string, required): The student's major.
- averageGrade (number, required): The student's average grade.

#### Response
Status code 204 (No Content) if successful. Message in console that student was successfully deleted.
