import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { NgFor, NgIf } from '@angular/common';
import { ProductInformationComponent } from '../overlays/components/product-information/product-information.component';


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

  // Gruppenbildung basierend auf Kategorien
  const grouped = hamburgers.reduce((acc, hamburger) => {
    acc[hamburger.category] = acc[hamburger.category] || [];
    acc[hamburger.category].push(hamburger);
    return acc;
  }, {} as { [key: string]: Hamburger[] });

  // Zuordnung von Bildern und Kategorien
  this.groupedHamburgers = Object.entries(grouped).map(([category, burgers]) => ({
    category,
    burgers,
    image: this.hamburgerservice.getCategoryImage(category), // Hole das passende Bild
  }));

  }


  convertDotToComma(price: number) {
    return price.toFixed(2).replace('.', ',')
  }

  openProductInfo(): void {
    this.productInfoOpened.emit(); // Event auslösen
  }
}



