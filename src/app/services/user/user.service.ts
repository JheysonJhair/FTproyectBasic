import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl = 'https://localhost:7140/';
  private myUrlLogin = 'user/login/';

  private myUrlGet = 'user/getall/';
  private myApiInsert = 'user/insert/';
  private myUrlDelete = 'user/delete?id=';
  private myUrlPut = 'user/update/';
  private myUrlGetId = 'user/getbypk?idUser=';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  // Login
  postLogin(login: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myUrlLogin, login);
  }

  // Usuarios
  getListUser(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.myAppUrl + this.myUrlGet, { headers });
  }

  deleteUser(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.myAppUrl + this.myUrlDelete + id, { headers });
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiInsert, user);
  }

  getUserById(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.myAppUrl + this.myUrlGetId + id, { headers });
  }

  updateUser(user: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.myAppUrl + this.myUrlPut, user, { headers });
  }
}
