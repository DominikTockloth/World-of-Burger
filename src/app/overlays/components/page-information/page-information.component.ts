import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-information',
  standalone: true,
  imports: [],
  templateUrl: './page-information.component.html',
  styleUrl: './page-information.component.scss'
})
export class PageInformationComponent {
  isPageInfoOpen: boolean = false;

  openPageInfo(): void {
    this.isPageInfoOpen = true;
    document.body.style.overflow = 'hidden';
  }
  closePageInfo(): void {
    this.isPageInfoOpen = false;
    document.body.style.overflow = '';
  }

}
