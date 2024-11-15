import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

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

  constructor() { }
}
