import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-information',
  standalone: true,
  imports: [NgFor],
  templateUrl: './page-information.component.html',
  styleUrl: './page-information.component.scss'
})
export class PageInformationComponent {
  @Output() pageInfoClosed = new EventEmitter<void>();
  paymentImages: string[] = ['/images/card.png', '/images/bitcoin.png', '/images/contactless.png', '/images/pound.png', '/images/euro.png', '/images/rupee.png', '/images/ruble.png',];
  isPageInfoOpen: boolean = false;

  openPageInfo(): void {
    this.isPageInfoOpen = true;
    document.body.style.overflow = 'hidden';
  }
  closePageInfo(): void {
    this.pageInfoClosed.emit();
  }

}
