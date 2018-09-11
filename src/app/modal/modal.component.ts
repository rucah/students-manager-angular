import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  data: DialogData;

  constructor(@Inject(MAT_DIALOG_DATA) dialogData: DialogData) {
    this.data = dialogData;
  }
}

export class DialogData {

  constructor(title: string, message: string, type: string) {
    this.title = title;
    this.message = message;
    this.type = type;

  }

  get title (): string { return this.title; }
  set title (title: string) { this.title = title; }

  get message (): string { return this.message; }
  set message (message: string) { this.message = message; }

  get type (): string { return this.type; }
  set type (type: string) { this.type = type; }
}
// USAGE
//
// import { MatDialog, MatDialogRef } from '@angular/material';
// import { filter, finalize } from 'rxjs/operators';
// import { ModalComponent, DialogData } from './modal/modal.component';
// import { config } from './configs/config';
//
// openDialog() : void {
//   if(!this.dialog) {
//     this.dialog = this.matdialog.open(ModalComponent, {
//       ...config.dailog,
//       data: {
//         ...config.dailog.data,
//         message: 'this is a test'
//       }
//     });
//   }

//   this.dialog.afterClosed().pipe(
//     finalize(() => this.dialog = undefined)
//   );
// }
