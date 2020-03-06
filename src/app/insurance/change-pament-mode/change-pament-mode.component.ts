import { element } from 'protractor';
import { InsuranceService } from './../../shared/insurance.service';
import { DataService } from './../../shared/dataService';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pament-mode',
  templateUrl: './change-pament-mode.component.html',
  styleUrls: ['./change-pament-mode.component.css']
})
export class ChangePamentModeComponent implements OnInit {
  titleOfPageChangeOfMode: string;
  policyNumber;
  Monthly = false;
  Qaterly = false;
  Yearly = false;
  loggedinUser;
  getModeOfPaymentInf;
  changePaymentForm: FormGroup;
  constructor(private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private data: DataService) { }
  ngOnInit() {
    this.titleOfPageChangeOfMode = 'Chnage Of Mode';
    const loggedInUser = JSON.parse(localStorage.getItem('loginInfo'));
    this.loggedinUser  = loggedInUser.userName;
    this.activatedRoute.params.subscribe((params) => {
      if (Object.keys(params).length) {
        this.getModeOfPaymentInf = Object.values(params);
        this.policyNumber = this.getModeOfPaymentInf[0];
        if (this.getModeOfPaymentInf[1] === 'Monthly') {
          this.Monthly = true;
        }
        if (this.getModeOfPaymentInf[1] === 'Qaterly') {
          this.Qaterly = true;
        }
        if (this.getModeOfPaymentInf[1] === 'Yearly') {
          this.Yearly = true;
        }
      }
    });
    this.changePaymentForm = this.fb.group({
      modeOfPayment: [''],
      policyNumber: [this.policyNumber]
    });
  }
  onSubmit(changePaymentModeForm) {
    if (!changePaymentModeForm) {
      return false;
    } else {
      this.insuranceService.changePaymentMode(changePaymentModeForm.value).subscribe((res) => {
        console.log(res);
        if (res) {
          this.router.navigate(['/insureyou/home']);
        }
      });
    }


  }
  logOut() {
    localStorage.removeItem('loginInfo');
    this.router.navigate(['/insureyou/login']);
 }
}
