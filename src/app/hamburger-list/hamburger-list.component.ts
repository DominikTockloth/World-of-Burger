import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { NgFor, NgIf } from '@angular/common';
import { ProductInformationComponent } from '../overlays/components/product-information/product-information.component';
import { MainContentComponent } from '../main-content/main-content.component';

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

  isProductInfoOpen: boolean = false;
  hamburgers: Hamburger[] = [];

  constructor(private hamburgerservice: HamburgerService) { }

  ngOnInit(): void {
    this.hamburgers = this.hamburgerservice.getHamburgers();
  }

  convertDotToComma(price: number) {
    return price.toFixed(2).replace('.', ',')
  }

  openProductInfo(): void {
    this.productInfoOpened.emit(); // Event auslösen
  }
}
