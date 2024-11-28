import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-order-message',
  standalone: true,
  imports: [],
  templateUrl: './order-message.component.html',
  styleUrl: './order-message.component.scss'
})
export class OrderMessageComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartservice: CartService) { }


  ngOnInit(): void {
    //Changes of basket get subscribed
    this.cartservice.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  convertToDecimal(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }
}
