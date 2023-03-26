import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PrimesIndemnintiesService {

  private api = `${api}/indemnity`;
  private admin: any;
  constructor(
    private http: HttpClient
  ) {
  }

  public addIndemnity(indemnity: any) {
    return this.http.post(`${this.api}`, indemnity)
  }

  public indemnityByEmployee(id: number) {
    return this.http.get(`${this.api}/employee/${id}`)
  }

  public updateEmplyeeIndemnity(indemnity: any) {
    return this.http.put(`${this.api}`, indemnity);
  }
}
