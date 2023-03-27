import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PrimeNGConfig, ConfirmationService } from 'primeng/api';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private user: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  async ngOnInit() {
    this.primengConfig.ripple = true;
    const storage: any | null = sessionStorage.getItem('TOKEN');
    const accessToken = JSON.parse(storage);

    if (accessToken !== null) {
      const expired = this.jwtHelper.isTokenExpired(accessToken);
      await this.updateSessionStorage();

      if (expired) {
        this.confirmationService.confirm({
          key: 'global',
          message: 'Votre session a expirée. Veuillez vous reconnecter.',
          accept: () => {
            sessionStorage.removeItem('USER_INFO');
            sessionStorage.removeItem('TOKEN');
            this.router.navigate(['/login']);
          }
        });
      }
    }
  }

  async updateSessionStorage() {
    const storage: any | null = sessionStorage.getItem('USER_INFO');
    const user = JSON.parse(storage);
    await (await this.employeeService.findByIdAndState(user?.id, 'Activate')).subscribe({
      next: (employee: any) => {
        sessionStorage.setItem('USER_INFO', JSON.stringify(employee));
      }
    });
  }

}
