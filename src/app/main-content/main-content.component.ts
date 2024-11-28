import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { HamburgerListComponent } from '../hamburger-list/hamburger-list.component';
import { ProductInformationComponent } from '../overlays/components/product-information/product-information.component';
import { NgFor, NgIf } from '@angular/common';
import { PageInformationComponent } from '../overlays/components/page-information/page-information.component';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../services/cart.service';
import { OrderMessageComponent } from '../overlays/components/order-message/order-message.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    HamburgerListComponent,
    ProductInformationComponent,
    PageInformationComponent,
    OrderMessageComponent,
    NgIf,
    NgFor,
    FormsModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {
  isProductInfoOpen: boolean = false;
  isPageInfoOpen: boolean = false;
  isHeartFilled: boolean = false;

  hamburgers: Hamburger[] = [];
  groupedHamburgers: { category: string; burgers: Hamburger[]; image: string }[] = [];
  filteredHamburgers: Hamburger[] = [];
  searchValue: string = '';

  @Output() pageInfoclosed = new EventEmitter<void>();

  constructor(private hamburgerservice: HamburgerService, private cartservice: CartService) { }


  ngOnInit(): void {
    this.hamburgers = this.hamburgerservice.getHamburgers();

    // Group burgers by its category
    const grouped = this.hamburgers.reduce((acc, hamburger) => {
      acc[hamburger.category] = acc[hamburger.category] || [];
      acc[hamburger.category].push(hamburger);
      return acc;
    }, {} as { [key: string]: Hamburger[] });

    // Get the category image by checking the burger category
    this.groupedHamburgers = Object.entries(grouped).map(([category, burgers]) => ({
      category,
      burgers,
      image: this.hamburgerservice.getCategoryImage(category), // Get category image
    }));
  }

  /*****************************  Handles the search and filter functions  ********************/
  onInput(): void {
    this.filterHamburgers(this.searchValue);
  }

  filterHamburgers(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.groupedHamburgers;
    } else {
      this.filteredHamburgers = this.hamburgers.filter(hamburger =>
        hamburger.name.toLowerCase().includes(this.searchValue.toLowerCase())  // Filter by name
      );
    }
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
  
  /*****************************  Handles the product-information overlay  ********************/
  openProductInfo(): void {
    this.isProductInfoOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeProductInfo(): void {
    this.isProductInfoOpen = false;
    document.body.style.overflow = '';
  }
  /***********************************  Handles the page-information overlay  ********************/
  openPageInfo(): void {
    this.isPageInfoOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closePageInfo(): void {
    this.isPageInfoOpen = false;
    document.body.style.overflow = '';
  }

  /*********  Switches the heart icon on main-content to filled and not filled  ********************/
  toggleHeart(): void {
    this.isHeartFilled = !this.isHeartFilled;
  }

  get heartImage(): string {
    return this.isHeartFilled
      ? '/images/black-heart-filled.png'
      : '/images/black-heart-empty.png';
  }

}

