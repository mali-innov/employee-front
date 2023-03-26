import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { PosteService } from 'src/app/services/poste.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public employeeForm!: FormGroup;
  public departments: any[] = [];
  public posts: any[] = [];
  public contentLoaded: boolean = true;
  public saving: boolean = false;
  displayBasic!: boolean;
  constructor(
    private posteService: PosteService,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    this.initializeEmployeeForm();
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      this.saving = true;
      this.employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (data: any) => {
          this.messageService.add({ key: 'infosAddEmp', severity: 'success', summary: 'Enregistrement', detail: 'Employé(e) ajouté(e) avec succes' });
          this.employeeForm.reset();
          this.saving = false;
        },
        error: (error: any) => {
          if (error.status === 0) {
            this.messageService.add({ key: 'infosAddEmp', severity: 'error', summary: 'Enregistrement', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
          } else {
            this.messageService.add({ key: 'infosAddEmp', severity: 'error', summary: 'Enregistrement', detail: `${error.error.message}` });
          }
          this.saving = false;
        }
      })
    } else {
      this.messageService.add({ key: 'infosAddEmp', severity: 'error', summary: 'Enregistrement', detail: 'Veuillez remplir tous les champs' });
      this.saving = false;
    }
  }

  public initializeEmployeeForm() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.minLength(8), Validators.required]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      maritalStatus: new FormControl('', [Validators.required]),
      numberOfChildren: new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      hireDate: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      placeOfBirth: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      matricule: new FormControl('', [Validators.required]),
      post: new FormControl('', [Validators.required]),
    });
  }
}
