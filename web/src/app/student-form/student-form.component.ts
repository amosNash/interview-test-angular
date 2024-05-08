import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  @Output() studentAdded = new EventEmitter<Student>();
  studentForm: FormGroup;

  constructor(private studentService: StudentService, private fb:  FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      major: ['', Validators.required],
      averageGrade: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const newStudent: Student = this.studentForm.value;
      this.studentService.addStudent(newStudent).subscribe({
        next: (response) => {
          this.studentAdded.emit(newStudent);
          this.studentForm.reset();
          console.log('Student added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding student:', error);
        }
      });
    }
  }

  parseFloatAverageGrade(value: string): number {
    return parseFloat(value);
  }
}
