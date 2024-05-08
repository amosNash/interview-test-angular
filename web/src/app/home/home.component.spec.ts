/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { mockStudentsData } from '../test-data/students.data';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStudentService: jasmine.SpyObj<StudentService>;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(async() => {
    mockStudentService = jasmine.createSpyObj('StudentService', ['getStudents']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpClientModule],
      providers: [{ provide: StudentService, useValue: mockStudentService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    consoleErrorSpy = spyOn(console, 'error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStudents on initialization', () => {
    // Arrange
    const students: Student[] = mockStudentsData;
    const getStudentsSpy = mockStudentService.getStudents.and.returnValue(of(students));

    // Act
    mockStudentService.getStudents.and.returnValue(of(students));
    fixture.detectChanges();

    // Assert
    expect(getStudentsSpy).toHaveBeenCalled();
    expect(component.students).toEqual(students);
  });

  it('should log error message when getStudents is invoked', () => {
    // Arrange
    const error = 'Hello this is testing an error message';
    const getStudentsSpy = mockStudentService.getStudents.and.returnValue(throwError(error));

    // Act
    fixture.detectChanges();

    // Assert
    expect(getStudentsSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error retrieving students', error);
  });


});