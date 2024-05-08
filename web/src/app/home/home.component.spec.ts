/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { mockStudentsData } from '../test-data/students.data';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;
  let mockBaseUrl = 'http://mock.base.url/';

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'BASE_URL', useValue: mockBaseUrl }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch students on initialization', () => {
    let mockStudents = mockStudentsData;
    component.ngOnInit();
    const req = httpMock.expectOne(`${mockBaseUrl}students`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockStudents);
    expect(component.students).toEqual(mockStudents);
  });
});
