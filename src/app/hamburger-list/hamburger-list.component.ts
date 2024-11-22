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
  groupedHamburgers: { category: string; burgers: Hamburger[]; image: string }[] = [];
  isProductInfoOpen: boolean = false;
  hamburgers: Hamburger[] = [];

  constructor(private hamburgerservice: HamburgerService) { }

  ngOnInit(): void {
    const hamburgers = this.hamburgerservice.getHamburgers();
    this.groupedHamburgers = Object.entries(
      hamburgers.reduce((groups, hamburger) => {
        groups[hamburger.category] = groups[hamburger.category] || [];
        groups[hamburger.category].push(hamburger);
        return groups;
      }, {} as { [key: string]: Hamburger[] })
    ).map(([category, burgers]) => ({
      category,
      burgers,
      image: this.hamburgerservice.getCategoryImage(category),
    }));
    
  }


  convertDotToComma(price: number) {
    return price.toFixed(2).replace('.', ',')
  }

  openProductInfo(): void {
    this.productInfoOpened.emit(); // Event auslösen
  }
}



