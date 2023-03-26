import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { PosteService } from '../../services/poste.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() employee: any;
  public employeeForm!: FormGroup;
  public posts: any;
  public departments: any;
  public department: any;
  public post: any;
  public loadingContent: boolean = true;
  public loadingUpdate: boolean = false;
  constructor(
    private service: EmployeeService,
    private posteService: PosteService,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    this.employeeForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.minLength(3), Validators.required]),
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
      matricule: new FormControl('', [Validators.required]),
      post: new FormControl('', [Validators.required]),
    });

    this.employeeForm.controls['id'].setValue(this.employee.id);
    this.employeeForm.controls['firstName'].setValue(this.employee.firstName);
    this.employeeForm.controls['lastName'].setValue(this.employee.lastName);
    this.employeeForm.controls['email'].setValue(this.employee.email);
    this.employeeForm.controls['username'].setValue(this.employee.username);
    this.employeeForm.controls['password'].setValue(this.employee.password);
    this.employeeForm.controls['phoneNumber'].setValue(this.employee.phoneNumber);
    this.employeeForm.controls['gender'].setValue(this.employee.gender);
    this.employeeForm.controls['address'].setValue(this.employee.address);
    this.employeeForm.controls['maritalStatus'].setValue(this.employee.maritalStatus);
    this.employeeForm.controls['numberOfChildren'].setValue(this.employee.numberOfChildren);
    this.employeeForm.controls['basicSalary'].setValue(this.employee.basicSalary);
    this.employeeForm.controls['dateOfBirth'].setValue(this.employee.dateOfBirth);
    this.employeeForm.controls['hireDate'].setValue(this.employee.hireDate);
    this.employeeForm.controls['category'].setValue(this.employee.category);
    this.employeeForm.controls['placeOfBirth'].setValue(this.employee.placeOfBirth);
    this.employeeForm.controls['post'].setValue(this.employee?.post);
    this.employeeForm.controls['grade'].setValue(this.employee?.grade);
    this.employeeForm.controls['matricule'].setValue(this.employee.matricule);
    this.department = this.employee?.post?.service?.department?.id;

    this.loadData();
    setInterval(() => {
      this.loadingContent = false;
    }, 3130);

  }

  async loadData() {
    (await this.posteService.getPostes()).subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        if (error.status === 0){
          this.messageService.add({ key: 'infosUpdateEmp', severity: 'error', summary: 'Postes', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
        } else {
          this.messageService.add({ key: 'infosUpdateEmp', severity: 'error', summary: 'Postes', detail: `${error.error.message}` });
        }
      }
    });
  }



  public async updateEmployee() {
    this.loadingUpdate = true;
    this.employeeForm.value.poste.service = {
      id: this.employee.post.service.id,
      department: { id: this.department }
    };

    if (this.employeeForm.valid) {
      (await this.service.updateEmployee(this.employeeForm.value)).subscribe((employee: any) => {
        this.employee = employee;
        this.loadingUpdate = false;
        this.messageService.add({ key: 'infosUpdateEmp', severity: 'success', summary: 'Mise à jour', detail: 'Mise à jour effectuée avec succes' });
      }, (error: any) => {
        this.loadingUpdate = false;
        if (error.status === 0) {
          this.messageService.add({ key: 'infosUpdateEmp', severity: 'error', summary: 'Mise à jour', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
        } else {
          this.messageService.add({ key: 'infosUpdateEmp', severity: 'error', summary: 'Mise à jour', detail: `${error.error.message}` });
        }
      });
    } else {
      this.loadingUpdate = false;
      this.messageService.add({ key: 'infosUpdateEmp', severity: 'error', summary: 'Departements', detail: 'Veuillez renseigner correctement les champs' });
    }
  }

}
