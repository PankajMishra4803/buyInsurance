import { InsuranceService } from './../../shared/insurance.service';
import { Router } from '@angular/router';
import { DataService } from './../../shared/dataService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {
  titleOfPage: string;
  userloing: string;
  userInsurances = [];
  constructor(private dataService: DataService, private router: Router, private insuranceService: InsuranceService) { }

  ngOnInit() {
   this.dataService.currentMessage.subscribe((message) => this.titleOfPage = message);
   const logininfo = JSON.parse(localStorage.getItem('loginInfo'));
   if (logininfo) {
    this.userloing =  logininfo.userName;
    this.insuranceService.userSpecificInsurance(this.userloing).subscribe((response: any) => {
     if (response.data) {
        this.getNextPrimium(response.data);
     }
    });
   }
  }
  getNextPrimium(getInsuranceData) {
    if (getInsuranceData) {
        const userInsurance  = [];
        getInsuranceData.forEach(element => {
              if (element.modeOfPayment === 'Monthly') {
                const createdDate = new Date(element.createDate);
                const month = (createdDate.getMonth() + 1) + 1;
                const year = createdDate.getFullYear();
                const day = createdDate.getDate();
                element.createDate = day + '/' + month  + '/' + year;
                userInsurance.push(element);
                }
              if (element.modeOfPayment === 'Quterly') {
                const createdDate = new Date(element.createDate);
                const month = (createdDate.getMonth() + 1) + 4;
                const year = createdDate.getFullYear();
                const day = createdDate.getDate();
                element.createDate = day + '/' + month  + '/' + year;
                userInsurance.push(element);
                  }
              if (element.modeOfPayment === 'Yearly') {
                  const createdDate = new Date(element.createDate);
                  const month = (createdDate.getMonth() + 1);
                  const year = createdDate.getFullYear() + 1;
                  const day = createdDate.getDate();
                  element.createDate = day + '/' + month  + '/' + year;
                  userInsurance.push(element);
                  }
        });
        this.userInsurances = userInsurance;

    }

  }
  logOut() {
     localStorage.removeItem('loginInfo');
     this.router.navigate(['/insureyou/login']);
  }
}
