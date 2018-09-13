import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { config } from '../configs/config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  data: DialogData;
  dialog: MatDialogRef<ModalComponent>;

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

export class Modal {
  // data: DialogData;
  dialog: MatDialogRef<ModalComponent>;

  constructor(public matdialog: MatDialog) {
  }

  public alert(title, message) : void {
    if(!this.dialog) {
      this.dialog = this.matdialog.open(ModalComponent, {
        ...config.dailog,
        data: {
          ...config.dailog.data,
          title,
          message
        }
      });
    }
    // Only one instance onpened at a time
    this.dialog.afterClosed().pipe(
      finalize(() => { this.dialog = undefined; })
    ).subscribe();
  }
}
