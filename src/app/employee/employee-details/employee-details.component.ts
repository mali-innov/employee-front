import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {


  @Input() employee: any;
  public salaries!: any[];
  public panelOpenState = false;
  public displayUpdate: boolean = false;

  constructor(
    private dialogService: DialogService
  ) { }

  async ngOnInit() {
  }


}
