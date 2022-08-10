import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.scss']
})
export class UserFunctionsComponent implements OnInit {
  checkBox = true;
  ngOnInit(): void {
   
  }
  
  displayedColumns: string[] = ['menuItem','admin', 'add', 'edit', 'delete','print','label','sp1','sp2','sp3','sp4','sp5','activeMenu'];
  displayedColumns2: string[] = ['chk1','chk2', 'chk3', 'chk4', 'chk5','chk6','chk7','chk8','chk9','chk10','chk11','chk12','chk13'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
}
export interface PeriodicElement {
  menuItem:string;
  admin: boolean;
  add: string;
  edit: number;
  delete: string;
  print:string;
  label:string;  
  sp1: string;
  sp2: string;
  sp3: string;
  sp4: string;
  sp5: string;
  activeMenu: string;
  

}

const ELEMENT_DATA: PeriodicElement[] = [
  {menuItem:'Menu Item',admin: true, add: 'Hydrogen', edit: 1.0079, delete: 'H',print:'Test',label:'test',sp1:'test',sp2:'test',sp3:'test',sp4:'test',sp5:'test',activeMenu:'test'},
  {menuItem:'Menu Item',admin: true, add: 'Helium', edit: 4.0026, delete: 'He',print:'Test',label:'test',sp1:'test',sp2:'test',sp3:'test',sp4:'test',sp5:'test',activeMenu:'test'},
  {menuItem:'Menu Item',admin: true, add: 'Lithium', edit: 6.941, delete: 'Li',print:'Test',label:'test',sp1:'test',sp2:'test',sp3:'test',sp4:'test',sp5:'test',activeMenu:'test'},
  {menuItem:'Menu Item',admin: true, add: 'Beryllium', edit: 9.0122, delete: 'Be',print:'Test',label:'test',sp1:'test',sp2:'test',sp3:'test',sp4:'test',sp5:'test',activeMenu:'test'},
  {menuItem:'Menu Item',admin: true, add: 'Boron', edit: 10.811, delete: 'B',print:'Test',label:'test',sp1:'test',sp2:'test',sp3:'test',sp4:'test',sp5:'test',activeMenu:'test'},
  {menuItem:'Menu Item',admin: true, add: 'Carbon', edit: 12.0107, delete: 'C',print:'Test',label:'test',sp1:'test',sp2:'test',sp3:'test',sp4:'test',sp5:'test',activeMenu:'test'},
  {menuItem:'Menu Item',admin: true, add: 'Nitrogen', edit: 14.0067, delete: 'N',print:'Test',label:'test',sp1:'test',sp2:'test',sp3:'test',sp4:'test',sp5:'test',activeMenu:'test'}
];