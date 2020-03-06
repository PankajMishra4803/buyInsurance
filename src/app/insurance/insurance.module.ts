import { InsuranceService } from './../shared/insurance.service';
import { DataService } from './../shared/dataService';
import { InsuranceComponent } from './insurance/insurance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import {MatToolbarModule, MatFormFieldModule, MatListModule, MatIconModule, MatSidenavModule, MatMenuModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayPremiumComponent } from './pay-premium/pay-premium.component';
import { ChangePamentModeComponent } from './change-pament-mode/change-pament-mode.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [InsuranceComponent, BuyInsuranceComponent, PayPremiumComponent, ChangePamentModeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    InsuranceRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [DataService, InsuranceService]
})
export class InsuranceModule { }
