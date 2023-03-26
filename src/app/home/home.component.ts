import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  public admin: any;
  public menuIndex: string = 'employees_list';
  public menuItems!: MenuItem[];
  public loginData: any;
  opened: boolean = true;
  constructor(
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    const loginData: any = sessionStorage.getItem('USER_INFO');
    this.loginData = JSON.parse(loginData);
    await this.getAdmin();
  }

  public async getAdmin() {
    // this.loading = true;
    // this.adminService.getAdminById(this.loginData.id).subscribe((admin: any) => {
    //   this.admin = admin;
    //   sessionStorage.setItem('USER_INFO', JSON.stringify(this.admin));
    //   // this.loading = false;
    // }, (error: any) => {
    //   if (error.status === 0) {
    //     this.messageService.add({ key: 'home-page', severity: 'error', summary: 'Administrateur', detail: 'Impossible de se connecter au server, veuillez verifier la connexion' });
    //   } else {
    //     this.messageService.add({ key: 'home-page', severity: 'error', summary: 'Administrateur', detail: `${error.error.message}` });
    //   }
    // });
  }

  logOut() {
    sessionStorage.removeItem('USER_INFO');
    location.reload();
  }

  public switchMemu(index: any) {
    this.menuIndex = index;
  }

}
