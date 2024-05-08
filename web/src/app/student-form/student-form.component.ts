import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  @Output() studentAdded = new EventEmitter<Student>();

  constructor(private studentService: StudentService) {}

  onSubmit(firstName: string, lastName: string, email: string, major: string, averageGrade: number) {
    const newStudent: Student = { firstName, lastName, email, major, averageGrade };
    this.studentService.addStudent(newStudent).subscribe({
      next: (response) => {
        this.studentAdded.emit(newStudent);
        console.log('Student added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding student:', error);
      }
    });
  }

  parseFloatAverageGrade(value: string): number {
    return parseFloat(value);
  }

}
