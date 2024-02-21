import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private myAppUrl = 'http://localhost:4200/';
  private myApiUrl = 'api/student/'

  constructor(private http: HttpClient) { }

  getListStudents(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveStudent(student: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, student);
  }
}
