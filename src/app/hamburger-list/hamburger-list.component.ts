import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { NgFor, NgIf } from '@angular/common';
import { ProductInformationComponent } from '../overlays/components/product-information/product-information.component';
import { CartItem, CartService } from '../services/cart.service';


@Component({
  selector: 'app-hamburger-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ProductInformationComponent
  ],
  templateUrl: './hamburger-list.component.html',
  styleUrl: './hamburger-list.component.scss'
})
export class HamburgerListComponent implements OnInit {
  @Output() productInfoOpened = new EventEmitter<void>();
  groupedHamburgers: { category: string; burgers: Hamburger[]; image: string }[] = [];
  isProductInfoOpen: boolean = false;
  hamburgers: Hamburger[] = [];


  constructor(private hamburgerservice: HamburgerService, private cartservice: CartService) { }

  ngOnInit(): void {
    const hamburgers = this.hamburgerservice.getHamburgers();

    // Group burgers by its category
    const grouped = hamburgers.reduce((acc, hamburger) => {
      acc[hamburger.category] = acc[hamburger.category] || [];
      acc[hamburger.category].push(hamburger);
      return acc;
    }, {} as { [key: string]: Hamburger[] });

    // Get the category image by checking the burger category
    this.groupedHamburgers = Object.entries(grouped).map(([category, burgers]) => ({
      category,
      burgers,
      image: this.hamburgerservice.getCategoryImage(category), // Hole das passende Bild
    }));
  }

  // Add one item to cart
  addToCart(product: any): void {
    const cartItem: CartItem = { ...product, quantity: 1 }; // Standardmäßig 1 Stück
    this.cartservice.addToCart(cartItem);
  }

  // Replaces the dot with the comma
  convertDotToComma(price: number) {
    return price.toFixed(2).replace('.', ',')
  }

  openProductInfo(): void {
    this.productInfoOpened.emit(); // Event auslösen
  }
}



