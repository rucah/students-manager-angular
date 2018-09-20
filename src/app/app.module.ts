import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule, 
  MatIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';


const appRoutes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

const angularMaterialItems = [
  MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
  MatDialogModule, MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    LoginComponent,
  ],
  entryComponents: [
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    ...angularMaterialItems,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
