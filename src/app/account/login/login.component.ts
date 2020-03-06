import { InsuranceService } from './../../shared/insurance.service';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  get userName() {return this.loginForm.get('userName');}
  get password() {return this.loginForm.get('password');}
  constructor(private router: Router, private fb: FormBuilder, private insuranceService: InsuranceService) { }

      ngOnInit() {
        this.loginForm = this.fb.group({
          userName: ['', Validators.pattern(/^[A-Za-z]\w{7,14}$/)],
          password: ['']
        });

      }
      onSubmit() {
        if (!this.loginForm.valid) {
          return false;
        } else {
          this.insuranceService.loginUser(this.loginForm.value).subscribe((response) => {
            console.log(response);
          });
          localStorage.setItem('loginInfo', JSON.stringify(this.loginForm.value));
          this.router.navigate(['/insureyou/home']);
       }

      }
  }
