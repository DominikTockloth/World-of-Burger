import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-information',
  standalone: true,
  imports: [],
  templateUrl: './product-information.component.html',
  styleUrl: './product-information.component.scss'
})
export class ProductInformationComponent {
  @Output() productInfoClosed = new EventEmitter<void>();

  closeProductInfo(): void {
    this.productInfoClosed.emit(); // Event auslösen
  }
}
