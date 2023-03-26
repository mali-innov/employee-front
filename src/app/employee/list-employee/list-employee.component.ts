import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListEmployeeComponent implements OnInit {

  public employees: any;
  public employeeToUpdate: any;
  public loadingList: boolean = true;
  display: boolean = false;
  public displayUpdate: boolean = false;
  public searchInput!: string;
  public displayAdd: boolean = false;
  public updatingState: boolean = false;
  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.allEmployee()
  }

  allEmployee() {
    this.employeeService.allEmployee().subscribe({
      next: (data: any) => {
        this.employees = data;
        this.loadingList = false;        
      },
      error: (error: any) => {
        if (error.status === 0) {
          this.messageService.add({ key: 'infos', severity: 'error', summary: 'Status', detail: 'Impossible de se connecter au server, veuillez verifier la connexion et réessayer' });
        } else {
          this.messageService.add({ key: 'infos', severity: 'error', summary: 'Status', detail: `${error.error.message}` });
        }
        this.loadingList = false;
      }
    });
  }

  public async updateEmployee(employee: any) {
    this.displayUpdate = true;
    this.employeeToUpdate = employee;
  }

  public async addEmployee() {
    this.displayAdd = true;
  }

  public updateEmployeeState(state: string, employee: any) {
    this.updatingState = true;
    return this.employeeService.restoreEmployee(state, employee).subscribe(async (employees: any) => {
      this.updatingState = false;
      this.allEmployee();
      this.messageService.add({ key: 'infos', severity: 'success', summary: 'Employé(e) modifié(e) avec succes' });
    }, (error: any) => {
      if (error.status === 0) {
        this.messageService.add({ key: 'infos', severity: 'error', summary: 'Status', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
      } else {
        this.messageService.add({ key: 'infos', severity: 'error', summary: 'Status', detail: `${error.error.message}` });
      }
      this.updatingState = false;
    });
  }

}
