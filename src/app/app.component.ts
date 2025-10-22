import { Component } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import { GoldDetailComponent } from '../gold-detail/gold-detail.component';
import { CustomerDetailComponent } from "../customer-detail/customer-detail.component";
import { ReceiptComponent } from "../receipt/receipt.component";

@Component({
  selector: 'app-root',
  imports: [MatTabsModule, GoldDetailComponent, CustomerDetailComponent, ReceiptComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gold-purchase-receipt';
  tabs = ['GOLD', 'SILVER'];
  currentStep!:number;

  onStepChange(step: number) {
    this.currentStep = step;
  }
}
