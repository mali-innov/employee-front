import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  private api: string = `${api}/posts`;
  private admin: any;
  constructor(
    private http: HttpClient,
  ) {}

  public addPoste(poste: any) {
    return this.http.post(`${this.api}`, poste);
  }

  public async getPostes() {
    return this.http.get(`${this.api}`);
  }

  public updatePoste(poste: any) {
    return this.http.put(`${this.api}`, poste);
  }
}
