import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Modal } from '../modal/modal.component';
import { config } from '../configs/config';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

class LoginForm {
  
  constructor(public username: string = '', public password: string = '') {};
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  login: LoginForm;
  loginForm: FormGroup;
  modal: Modal;
  hide: boolean = true;

  constructor(private loginService: LoginService, public matdialog: MatDialog, private router: Router) { 
    this.login =  new LoginForm();
    this.modal = new Modal(matdialog);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(this.login.username, [
        Validators.required,
        Validators.minLength(config.loginMinLength),
        Validators.maxLength(config.loginMaxLength)
      ]),
      'password': new FormControl(this.login.password, [
        Validators.required,
        Validators.minLength(config.loginMinLength),
        Validators.maxLength(config.loginMaxLength)
      ])
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const obs = this.loginService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);

      obs.subscribe((data) => {
            
        if(data['login']) {
          this.router.navigate(['/home']);
        } else {
          this.modal.alert('Erro!', 'Utilizador ou senha inválidos!');
        }
      },(error) => {
          this.modal.alert('Ocorreu um erro!', 'Ocorreu um erro a processar o pedido.' +
            'Por verifique ligação à rede ou tente mais tarde' );
            console.error('[Login.onSubmit] ', error);
      });
    }
  }

  getErrorMessage(formField: AbstractControl) {
    if(formField.dirty) {
      if(formField.hasError('required')) {
        return 'Campo obrigatório!'
      }
      
      if(formField.hasError('minlength')) {
        return 'No mínimo 3 carateres!'
      }
      
      if(formField.hasError('maxlength')) {
        return 'Máximo 20 carateres!'
      }
    }
    return null;
  }
}
