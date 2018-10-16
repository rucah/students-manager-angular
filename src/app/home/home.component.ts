import { Component, OnInit } from '@angular/core';
import { MatDialog, MatPaginatorIntl, MatTableDataSource, 
  PageEvent } from '@angular/material';
import { Modal } from '../modal/modal.component';
import { Student, StudentFilter, StudentsList, Pair } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'contacts', 'musicality', 'class', 'action'];
  dataSource = new MatTableDataSource<Student>();
  filter: StudentFilter;
  modal: Modal;
  students: StudentsList;
  classes: Pair[];

  constructor(private homeService: HomeService, matDialog: MatDialog, private matPaginatorIntl: MatPaginatorIntl) {
   
    this.filter = new StudentFilter();
    this.modal = new Modal(matDialog);
    this.students = new StudentsList();
  }

  ngOnInit() {
    this.filter.pageSize = 10;
    this.filter.page = 0;
    this.matPaginatorIntl.itemsPerPageLabel="Items por pág.";
    this.getClasses();
    this.applySearch();
  }

  applySearch() {
    try {
      this.homeService.getStudents(this.filter).subscribe((students) => {
        this.students = students;
        this.updateTableData(students);
      },(error) => { throw error; });
    } catch(error) {      
      this.modal.alert('Ocorreu um erro!', 'Não foi possível processar o pedido!');
      console.error('[Home.getSudents] ', error);
    }
  }

  updateTableData(students: StudentsList) {
    this.dataSource.data = students.data;
  }

  onPageChange(pageEvent: PageEvent) {
    this.filter.page = pageEvent.pageIndex;
    this.filter.pageSize = pageEvent.pageSize;
    this.applySearch();
  }

  editStudent(id: number) {
    console.log("TODO -> " , id);
  }

  getClasses(): void {
    try {
      this.homeService.getClasses().subscribe((classes) => {
      this.classes = classes;
      },(error) => { throw error; });
    } catch(error) {      
      this.modal.alert('Ocorreu um erro!', 'Não foi possível processar o pedido!');
      console.error('[Home.getClasses] ', error);
    }
  }
}
