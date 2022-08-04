import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-mst',
  templateUrl: './user-mst.component.html',
  styleUrls: ['./user-mst.component.scss']
})
export class UserMstComponent implements OnInit {
  
  displayedColumns: string[] = ['firstName', 'lastName', 'city', 'phoneNumber','loginName','userType','action'];
  
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  firstName: string;
  lastName: string;
  city: string;
  phoneNumber: string;
  loginName: string;
  userType: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { firstName: 'Shakir', lastName: 'Ali', city: 'Mardan', phoneNumber: '242424', loginName: 'shakirmit', userType: 'admin' }
];