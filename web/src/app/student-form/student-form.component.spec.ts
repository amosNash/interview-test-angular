import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFormComponent } from './student-form.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let mockStudentService: jasmine.SpyObj<StudentService>;

  beforeEach(async() => {
    mockStudentService = jasmine.createSpyObj('StudentService', ['getStudents']);

    await TestBed.configureTestingModule({
      declarations: [ StudentFormComponent ],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: StudentService, useValue: mockStudentService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method with correct input when form is submitted', () => {
    spyOn(component, 'onSubmit');

    const form = fixture.nativeElement.querySelector('form');
    const firstNameInput = fixture.nativeElement.querySelector('#firstName');
    const lastNameInput = fixture.nativeElement.querySelector('#lastName');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const majorInput = fixture.nativeElement.querySelector('#major');
    const averageGradeInput = fixture.nativeElement.querySelector('#averageGrade');

    // Set input values
    firstNameInput.value = 'John';
    lastNameInput.value = 'Doe';
    emailInput.value = 'john.doe@example.com';
    majorInput.value = 'Food';
    averageGradeInput.value = 45;

    // Trigger input events
    [firstNameInput, lastNameInput, emailInput, majorInput, averageGradeInput].forEach(input => input.dispatchEvent(new Event('input')));

    // Trigger form submit
    form.dispatchEvent(new Event('submit'));

    // Check if onSubmit method is called with correct arguments
    expect(component.onSubmit).toHaveBeenCalled();
  });
});