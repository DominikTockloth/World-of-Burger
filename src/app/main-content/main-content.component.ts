import { Component, EventEmitter, Output } from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { HamburgerListComponent } from '../hamburger-list/hamburger-list.component';
import { ProductInformationComponent } from '../overlays/components/product-information/product-information.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    HamburgerListComponent,
    ProductInformationComponent,
    NgIf
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  isProductInfoOpen: boolean = false;
  hamburgers: Hamburger[] = [];

  constructor() { }

  openProductInfo(): void {
    this.isProductInfoOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeProductInfo():void{
    this.isProductInfoOpen = false;
    document.body.style.overflow = '';
  }
  

}
