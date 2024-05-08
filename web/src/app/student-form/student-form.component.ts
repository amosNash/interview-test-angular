import { Component } from '@angular/core';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  onSubmitStudent() {
    console.log('here we are')
  }
}
