import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  isBasketEmpty: boolean = false;
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cartservice: CartService
  ) { }


  /*************   This handles the basket, display,add and remove items - clear basket ****/
  ngOnInit(): void {
    this.cartItems = this.cartservice.getCartItems();
    this.calculateTotal();
  }


  /**************  This is for calculating total sum of cart   ****************************/
  calculateTotal(): void {

  }

  
  convertToDecimal(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  /*************   This handles the sticky basket on scroll   *****************************/
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const basket = this.el.nativeElement.querySelector('#basketWrapper');
    const basketBox = this.el.nativeElement.querySelector('#basketBox');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 80) { // Passe den Wert an, ab wann der Basket fixed sein soll
      this.renderer.setStyle(basket, 'position', 'fixed');
      this.renderer.setStyle(basket, 'top', '0');
      this.renderer.setStyle(basket, 'right', '0');
      this.renderer.setStyle(basket, 'z-index', '4');
      this.renderer.setStyle(basketBox, 'height', '100vh');

    } else {
      this.renderer.setStyle(basket, 'position', 'absolute');
      this.renderer.setStyle(basket, 'top', '80px'); // Ursprüngliche Position
    }
  }
}
