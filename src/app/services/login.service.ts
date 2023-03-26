import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api: string = `${api}`;

  constructor(
    private http: HttpClient
  ) { }

  public login(user: any): Observable<any> {
    return this.http.post(`${this.api}/authentication`, user);
  }
}
