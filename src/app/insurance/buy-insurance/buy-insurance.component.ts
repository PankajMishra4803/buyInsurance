import { DataService } from './../../shared/dataService';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.css']
})
export class BuyInsuranceComponent implements OnInit {
  premiumAmountValue = 0;
  loggedinUser: string;
  titleOfPageBuyInsurance: string;
  buyInsuranceForm = this.fb.group({
    name: [''],
    nominee: [''],
    dateOfBirth: [''],
    relationship: [''],
    gender: ['', Validators.required],
    textareaAddress: [''],
    inputTenure: [''],
    modeOfPayment: [''],
    policyName: [''],
    premiumAmount: [this.premiumAmountValue]
  });
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.titleOfPageBuyInsurance = 'Buy Policy';

    const loggedInUser = JSON.parse(localStorage.getItem('loginInfo'));
    this.loggedinUser  = loggedInUser.userName;
  }
  changetenure(modeOfPayment, inputTenure, policyName){
    if (modeOfPayment && inputTenure && policyName) {
      this.changePolicy(modeOfPayment, inputTenure, policyName);
    } else {
      this.premiumAmountValue = 0;
    }
  }
  changemodeOfPayment(modeOfPayment, inputTenure, policyName) {
    if (modeOfPayment && inputTenure && policyName) {
      this.changePolicy(modeOfPayment, inputTenure, policyName);
    } else {
      this.premiumAmountValue = 0;
    }
  }
  changePolicy(modeOfPayment, inputTenure, policyName) {
    let tenureOfPolicy;
    let paymentPremiunOFMode;
    if (policyName === 'POL1') {
      tenureOfPolicy  = 200000 / inputTenure;
      if (modeOfPayment === 'Monthly') {
        paymentPremiunOFMode = tenureOfPolicy / 12;
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }
      if (modeOfPayment === 'Quterly') {
        paymentPremiunOFMode = tenureOfPolicy / 4;
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }
      if (modeOfPayment === 'Yearly') {
        paymentPremiunOFMode = tenureOfPolicy / 1;
        console.log(paymentPremiunOFMode);
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }

    }
    if (policyName === 'POL2') {
      tenureOfPolicy  = 800000 / inputTenure;
      if (modeOfPayment === 'Monthly') {
        paymentPremiunOFMode = tenureOfPolicy / 12;
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }
      if (modeOfPayment === 'Quterly') {
        paymentPremiunOFMode = tenureOfPolicy / 4;
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }
      if (modeOfPayment === 'Yearly') {
        paymentPremiunOFMode = tenureOfPolicy / 1;
        console.log(paymentPremiunOFMode);
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }

    }
    if (policyName === 'POL3') {
      tenureOfPolicy  = 800000 / inputTenure;
      if (modeOfPayment === 'Monthly') {
        paymentPremiunOFMode = tenureOfPolicy / 12;
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }
      if (modeOfPayment === 'Quterly') {
        paymentPremiunOFMode = tenureOfPolicy / 4;
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }
      if (modeOfPayment === 'Yearly') {
        paymentPremiunOFMode = tenureOfPolicy / 1;
        console.log(paymentPremiunOFMode);
        this.premiumAmountValue = Math.round(paymentPremiunOFMode);
        this.buyInsuranceForm.value.premiumAmount = this.premiumAmountValue;
      }

    }
  }
  onSubmit(buyInsuranceForm) {
    if (buyInsuranceForm.valid) {
      const objBuyInsurance = {};
      const arrayObje = [];
      objBuyInsurance [' name'] =  buyInsuranceForm.value.name;
      objBuyInsurance[' nominee'] = buyInsuranceForm.value.nominee;
      objBuyInsurance[' dateOfBirth'] = buyInsuranceForm.value.dateOfBirth;
      objBuyInsurance[' relationship'] = buyInsuranceForm.value.relationship;
      objBuyInsurance[' gender'] = buyInsuranceForm.value.gender;
      objBuyInsurance[' textareaAddress'] = buyInsuranceForm.value.textareaAddress;
      objBuyInsurance[' inputTenure'] = buyInsuranceForm.value.inputTenure;
      objBuyInsurance[' modeOfPayment'] = buyInsuranceForm.value.modeOfPayment;
      objBuyInsurance[' policyName'] = buyInsuranceForm.value.policyName;
      objBuyInsurance[' inputTenure'] = buyInsuranceForm.value.inputTenure;
      objBuyInsurance[' premiumAmount'] = buyInsuranceForm.value.premiumAmount;
      objBuyInsurance[' userName'] = this.loggedinUser;
      objBuyInsurance[' createdDate'] = new Date();
      arrayObje.push(objBuyInsurance);
      localStorage.setItem('buInsuranceData', JSON.stringify(arrayObje));
    }
    this.router.navigate(['/insureyou/paypremium']);
  }
  logOut() {
    localStorage.removeItem('loginInfo');
    this.router.navigate(['/insureyou/login']);
 }
}
