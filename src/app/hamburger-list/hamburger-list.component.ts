import { Component, OnInit } from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-hamburger-list',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './hamburger-list.component.html',
  styleUrl: './hamburger-list.component.scss'
})
export class HamburgerListComponent implements OnInit {
  hamburgers: Hamburger[] = [];

  constructor(private hamburgerservice: HamburgerService) { }

  ngOnInit(): void {
    this.hamburgers = this.hamburgerservice.getHamburgers();
  }
}
