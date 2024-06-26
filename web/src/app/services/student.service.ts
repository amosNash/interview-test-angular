import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:5000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  addStudent(student: Student): Observable<any> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  deleteStudent(student: Student): Observable<any> {
    return this.http.delete(this.baseUrl, { body: student });
  }
}
