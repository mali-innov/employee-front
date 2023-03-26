import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private admin: any;
  private employeeApi = `${api}/employee`;

  constructor(private http: HttpClient) {
  }

  public addEmployee(employee: any) {
    return this.http.post(`${this.employeeApi}`, employee)
  }

  public updateEmployee(employee: any) {
    return this.http.put(`${this.employeeApi}`, employee)
  }

  public allEmployee() {
    return this.http.get(`${this.employeeApi}`)
  }

  /**
   * Get employee by Id with activated state
   */
  public employeeById(id: number) {
    return this.http.get(`${this.employeeApi}/${id}`)
  }

  public login(loginValue: string) {
    return this.http.post(`${api}/authentication`, loginValue);
  }

  public deleteEmployee(employee: any) {
    return this.http.delete(`${this.employeeApi}`, { body: employee });
  }

  getEmployeesByState(state: string) {
    return this.http.get(`${this.employeeApi}/state/${state}`);
  }

  public restoreEmployee(state: string, employee: any) {
    employee.state = state;
    return this.http.put(`${this.employeeApi}/restore`, employee);
  }

}
