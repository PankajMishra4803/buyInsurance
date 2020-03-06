import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private apiUrl = "http://localhost:3000/api/insurance";
  private apiPostUrl = "http://localhost:3000/api/addInsurance";
  private apiPaylnsurance = "http://localhost:3000/api/addpremium";
  private apiLoginUser = "http://localhost:3000/api/logIn";
  private apigetUserInsurane = 'http://localhost:3000/api/userInsurance';
  private apiSpecificInsurance = 'http://localhost:3000/api/userInsurance/';
  private apiupdateUserInsurance = 'http://localhost:3000/api/updateUserInsurance/';
  private apiChangePaymentMode = 'http://localhost:3000/api/chnageModeOfPayment/' ;
  private apigetInsuranceDetails = 'http://localhost:3000/api/insuranceDetails/';
  constructor(private http: HttpClient ) { }

  getInsurance() {
   return this.http.get(this.apiUrl);
  }
  getUserInsurane() {
    return this.http.get(this.apigetUserInsurane);
   }
  postUser(userInfo) {
    console.log(userInfo);
    return this.http.post(this.apiPostUrl, userInfo);
  }
  paymentUserInsurance(primiumAmount) {
   return this.http.post(this.apiPaylnsurance, primiumAmount);
  }
  loginUser(loginUser) {
    return this.http.post(this.apiLoginUser, loginUser);
   }
  userSpecificInsurance(userName) {
    return this.http.get(this.apiSpecificInsurance + userName);
  }
  updateUserInsurance(updateValue) {
    return this.http.put(this.apiupdateUserInsurance, updateValue);
  }
  changePaymentMode(updateValue) {
    return this.http.put(this.apiChangePaymentMode, updateValue);
  }
  getInsuranceDetails(policyNumber) {
    return this.http.get(this.apigetInsuranceDetails + policyNumber);
  }
}
