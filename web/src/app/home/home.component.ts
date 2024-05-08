import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (result) => {
        this.students = result;
      },
      error: (error) => {
        console.error('Error retrieving students', error);
      },
    });
  }

  deleteStudent(student: Student) {
    this.studentService.deleteStudent(student).subscribe({
      next: (result) => {
        this.students = result;
        this.getStudents();
      },
      error: (error) => {
        console.error('Error delete student', error);
      },
    });
  }
}
