import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-gold-detail',
  imports: [MatExpansionModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './gold-detail.component.html',
  styleUrl: './gold-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoldDetailComponent {

  goldPurchaseForm!: FormGroup;
  // @Input() currentStep: number = 0;
  currentStep: number = 0;
  totalPrice: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.goldPurchaseForm = this.formBuilder.group({
      goldRate: ['', Validators.required],
      items: this.formBuilder.array([this.addMoreItems()]),
      URD: ['', Validators.required],
      Discount: ['', Validators.required],
      payment: 'cash'
    });
  }
  get items():FormArray {
    return this.goldPurchaseForm.get('items') as FormArray;
  }
  addMoreItems():FormGroup {
    return this.formBuilder.group({
      itemPurchase: ['', Validators.required],
      HUID: ['', Validators.required],
      weight: ['', Validators.required],
      price: [{value:'',disabled:true}, Validators.required]
    });
  }
  calculatePrice(){
    const goldRate = this.goldPurchaseForm.get('goldRate')?.value;
    for (let i = 0; i < this.items.length; i++) {
      this.items.at(i).patchValue({ price: goldRate * this.items.at(i).get('weight')?.value });
      console.log(this.items.at(i).get('price')?.value);    
    }
  }
  addNewItem(){
    this.items.push(this.addMoreItems());
  }
  removeItems(){
    this.items.removeAt(this.items.length - 1);
  }
  setStep(index: number) {
    this.currentStep = index;
  }
  save() {
    if (this.goldPurchaseForm?.valid) {
      console.log('Form Submitted!', this.goldPurchaseForm);
    } else {
      console.log('Form Submitted!', this.goldPurchaseForm);
      console.log('Form is invalid');
    }
  }
}
