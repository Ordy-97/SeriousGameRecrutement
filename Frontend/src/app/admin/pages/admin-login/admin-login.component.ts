import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { hugeUser, hugeKey01} from '@ng-icons/huge-icons'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth-service/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [
    NgIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  viewProviders: [provideIcons({ hugeUser, hugeKey01 })],
  providers: [AuthService],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  form !: FormGroup;
  loginError: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  login(){

    if(this.form.valid){
      console.log(this.form.value);
      this.authService.login({email: this.form.value.email, password: this.form.value.password});
    } else {
      this.loginError = 'Please enter a valid email and password';
    }
  }
}
