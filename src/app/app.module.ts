import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatFormFieldModule,
  MatInputModule, MatDialogModule, MatIconModule,
  MatRadioModule, MatSelectModule, MatTableModule,
  MatPaginatorModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


const appRoutes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

const angularMaterialItems = [
  MatCardModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule,
  MatDialogModule, MatRadioModule, MatSelectModule,MatIconModule,
  MatTableModule, MatPaginatorModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    LoginComponent,
    HomeComponent,
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
