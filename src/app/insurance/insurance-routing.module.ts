import { ChangePamentModeComponent } from './change-pament-mode/change-pament-mode.component';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayPremiumComponent } from './pay-premium/pay-premium.component';

const routes: Routes = [
  { path: 'home', component: InsuranceComponent },
  { path: 'buypolicy', component: BuyInsuranceComponent },
  { path: 'paypremium', component: PayPremiumComponent, data: {}},
  { path: 'changepaymentmode', component: ChangePamentModeComponent , data: {}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
