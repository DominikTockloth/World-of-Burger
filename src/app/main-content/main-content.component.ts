import { Component, EventEmitter, Output } from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { HamburgerListComponent } from '../hamburger-list/hamburger-list.component';
import { ProductInformationComponent } from '../overlays/components/product-information/product-information.component';
import { NgIf } from '@angular/common';
import { PageInformationComponent } from '../overlays/components/page-information/page-information.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    HamburgerListComponent,
    ProductInformationComponent,
    PageInformationComponent,
    NgIf
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  isProductInfoOpen: boolean = false;
  isPageInfoOpen: boolean = false;
  isHeartFilled: boolean = false;
  hamburgers: Hamburger[] = [];

  @Output() pageInfoclosed = new EventEmitter<void>();

  constructor() { }

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
