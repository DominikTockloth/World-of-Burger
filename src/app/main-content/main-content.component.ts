import { Component } from '@angular/core';
import { HamburgerService } from '../services/hamburger.service';
import { Hamburger } from '../models/hamburger.model';
import { HamburgerListComponent } from '../hamburger-list/hamburger-list.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    HamburgerListComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  hamburgers: Hamburger[] = [];
  
constructor(){}

}
