import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  @Output() menuIndex = new EventEmitter<string>();
  loginData: any;
  items!: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.loginData = sessionStorage.getItem('USER_INFO');
    this.items = [
      {
        label: 'Liste des employées',
        icon: 'pi pi-pw pi-users',
        command: () => {
          this.switchMemu('employees_list');
        }
      },
      {
        label: 'Organisation',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          {
            label: 'Poste',
            icon: 'pi pi-pi pi-briefcase',
            command: () => {
              this.switchMemu('postes');
            }
          }
        ]
      },
    ];
  }

  public async switchMemu(menu: string) {
    this.menuIndex.emit(menu);
  }

}
