import { NewPolicyInformation } from './../../shared/models/newPolicy-details';
import { PaymentInsurance } from './../../shared/models/payment-insurance';
import { InsuranceService } from './../../shared/insurance.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../shared/dataService';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-pay-premium',
  templateUrl: './pay-premium.component.html',
  styleUrls: ['./pay-premium.component.css']
})

export class PayPremiumComponent implements OnInit {
  titleOfPage: string;
  userInformation: [];
  priumAmount: any = 0;
  loggedinUser: string;
  showModal = false;
  newPolicyNumber;
  payPremiumForm: FormGroup;
  policyNumber;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private insuranceService: InsuranceService) { }

  get cardNumber() { return this.payPremiumForm.get('cardNumber'); }
  get cardCVVNumber() { return this.payPremiumForm.get('cardCVVNumber'); }
  get cardExpiryDate() { return this.payPremiumForm.get('cardExpiryDate'); }
  ngOnInit() {
    this.payPremiumForm = this.fb.group({
      cardNumber: ['', Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/)],
      cardExpiryDate: ['', Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)],
      cardCVVNumber: ['', Validators.pattern(/^[0-9]{3,3}$/)],
      cardHolderName: ['']
    });
    this.titleOfPage = 'Pay Premium';
    const loggedInUser = JSON.parse(localStorage.getItem('loginInfo'));
    this.loggedinUser = loggedInUser.userName;
    const userInformation: [] = JSON.parse(localStorage.getItem('buInsuranceData'));
    if (userInformation) {
      userInformation.forEach((element) => {
        this.priumAmount = element[' premiumAmount'];
      });
      this.userInformation = userInformation;
    }
    this.activatedRoute.params.subscribe((params) => {
      if (Object.keys(params).length) {
        const paramsValue = Object.values(params);
        this.priumAmount = paramsValue[0];
        this.policyNumber = paramsValue[1];
      }
    });

  }


  checkNumberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onSubmit() {
    if (!this.payPremiumForm) {
      return false;
    } else {
      if (this.policyNumber && this.priumAmount) {
        this.insuranceService.updateUserInsurance(this.policyNumber).subscribe((responce) => {
          console.log(responce);
        });
        localStorage.removeItem('buInsuranceData');
        this.router.navigate(['/insureyou/home']);
      } else {
        if (this.userInformation && this.payPremiumForm.value) {
          if (this.userInformation) {
            const primiumAmount = new PaymentInsurance();
            const arrayPrimiumAmount = [];
            this.userInformation.forEach(element => {
              primiumAmount.premiumAmount = element[' premiumAmount'];
              primiumAmount.policyName = element[' policyName'];
              primiumAmount.dateOfBirth = element[' dateOfBirth'];
              primiumAmount.modeOfPayment = element[' modeOfPayment'];
              primiumAmount.createDate = new Date();
              primiumAmount.userName = this.loggedinUser;
            });
            arrayPrimiumAmount.push(primiumAmount);
            this.insuranceService.paymentUserInsurance(arrayPrimiumAmount).subscribe((responce: any) => {
              console.log('r',responce.data.policyNumber);
              this.newPolicyNumber = responce.data.policyNumber;
            }, (err) => {
              console.log(err);
            });
          }
          if (this.userInformation) {
            const newPolicyInformation = new NewPolicyInformation();
            const arraynewPolicyInformation = [];
            this.userInformation.forEach(element => {
              newPolicyInformation.name = element[' name'];
              newPolicyInformation.nominee = element[' nominee'];
              newPolicyInformation.birthDate = element[' dateOfBirth'];
              newPolicyInformation.relationShip = element[' relationship'];
              newPolicyInformation.gender = element[' gender'];
              newPolicyInformation.address = element[' textareaAddress'];
              newPolicyInformation.tenure = element[' inputTenure'];
              newPolicyInformation.modeOFPayment = element[' modeOfPayment'];
              newPolicyInformation.policyName = element[' policyName'];
              newPolicyInformation.premiumAmount = element[' premiumAmount'];
              newPolicyInformation.userName = element[' userName'];
              newPolicyInformation.createDate = new Date();
            });
            arraynewPolicyInformation.push(newPolicyInformation);
            this.insuranceService.postUser(arraynewPolicyInformation).subscribe((responce) => {
              console.log(responce);
            }, (err) => {
              console.log(err);
            });

          }
          this.show();
          localStorage.removeItem('buInsuranceData');
        }

      }
    }
  }
  show() {
    document.getElementById("myModal").style.display = "block";
    this.showModal = true;

  }
  hide() {
    document.getElementById("myModal").style.display = "none";
    this.showModal = false;
    localStorage.removeItem('buInsuranceData');
    this.router.navigate(['/insureyou/home']);
  }
  logOut() {
    localStorage.removeItem('loginInfo');
    this.router.navigate(['/insureyou/login']);
 }
}


