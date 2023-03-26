import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInfo: any
  public loginForm!: FormGroup;
  public formStatus!: Message[];

  // Loading
  public loading: boolean = false;
  private user: any;


  public connecting: boolean = false;
  constructor(
    private service: LoginService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
    });
    const user: any | null = sessionStorage.getItem('USER_INFO');
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.router.navigateByUrl('/');
    }
  }

  login() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: (user: any) => {
          this.loading = false;
          sessionStorage.setItem('USER_INFO', JSON.stringify(user));
          sessionStorage.setItem('TOKEN', JSON.stringify(user.accessToken));
          this.messageService.add({ key: 'form', severity: 'success', summary: 'Connection', detail: 'Connection reussie' });

          setInterval(() => {
            location.reload();
          }, 1001);
        }, error: (error: any) => {
          this.loading = false;
          if (error.status === 0) {
            this.messageService.add({ key: "form", severity: 'error', summary: 'Connection', detail: "Impossible de se connecter au server, veuillez réessayer plus tard" });
          } else {
            this.messageService.add({ key: "form", severity: 'error', summary: 'Connection', detail: error?.error?.message });
          }
        }
      });
    } else {
      this.loading = false;
      this.messageService.add({ key: 'form', severity: 'error', summary: 'Formulaire', detail: 'Veuillez renseigner correctement les champs.' });
    }

  }
  }
