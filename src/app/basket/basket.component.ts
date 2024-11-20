import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgIf,

  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  isBasketEmpty: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

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
