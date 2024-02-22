import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../../components/auth/login/login.component';
import { User } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl = 'https://localhost:7140/';
  private myUrlLoginMail = 'user/login?mail=';
  private myUrlLoginPass = '&password=';

  private myUrlGet = 'user/getall/';
  private myApiInsert = 'user/insert/';
  private myUrlDelete = 'user/delete?id=';
  private myUrlPut = 'user/update/';
  private myUrlGetId = 'user/getbypk?idUser=';

  constructor(private http: HttpClient) {}

  //Login
  postLogin(mail: any, pass: any): Observable<any> {
    return this.http.get(
      this.myAppUrl + this.myUrlLoginMail + mail + this.myUrlLoginPass + pass
    );
  }

  //Usuarios
  getListUser(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myUrlGet);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myUrlDelete + id);
  }
  saveUser(user: any): Observable<any> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); JSON.stringify(user), { headers }
    return this.http.post(this.myAppUrl + this.myApiInsert, user);
  }
  getUserById(id: string): Observable<any> {
    // const headers = new HttpHeaders({
    //   Authorization: 'Bearer ' + LoginComponent.token,
    // });
    return this.http.get(this.myAppUrl + this.myUrlGetId + id);
  }
  updateUser(user: FormData): Observable<any> {
    return this.http.post(this.myAppUrl + this.myUrlPut, user);
  }
}
