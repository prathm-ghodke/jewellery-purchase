import { Component } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReceiptItem {
  name: string;
  qty: number;
  price: number;
}

interface Customer {
  name: string;
  email: string;
}

@Component({
  selector: 'app-receipt',
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {

    date = new Date();
  receiptNumber = `RCP-${Math.floor(Math.random() * 100000)}`;
  
  customer: Customer = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  items: ReceiptItem[] = [
    { name: 'Product A', qty: 2, price: 120 },
    { name: 'Product B', qty: 1, price: 250 },
  ];

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  }

  async downloadPDF(): Promise<void> {
    const element = document.getElementById('receipt');
    console.log('Downloading PDF...', element);
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${this.receiptNumber}.pdf`);
  }

  printReceipt(): void {
    window.print();
  }
}
