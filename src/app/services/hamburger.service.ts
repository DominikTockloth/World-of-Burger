import { Injectable } from '@angular/core';
import { Hamburger } from '../models/hamburger.model';

@Injectable({
    providedIn: 'root',
})
export class HamburgerService {

    getHamburgers(): Hamburger[] {
        return this.hamburgers;
    }

    getHamburgerById(id: number): Hamburger | undefined {
        return this.hamburgers.find((hamburger) => hamburger.id === id);
    }

    getCategoryImage(category: string): string {
        return this.categoryImages[category];
      }

    private hamburgers: Hamburger[] = [
        {
            id: 1,
            name: 'New Mexico Burger',
            ingredients: ['mit 125g Beef , Jalapenos, Tomaten und hausgemachter Chili-Cheesesauce'],
            category: 'beef',
            price: 10.50,
        },
        {
            id: 2,
            name: 'New Orleans Burger',
            ingredients:  ['mit 125g Beef, Krabben, Zwiebeln und hausgemachter Barbecuesauce'],
            category: 'beef',
            price: 11.50,
        },
        {
            id: 3,
            name: 'New York Burger',
            ingredients: ['mit 125g Beef, Bacon, Tomaten, Zwiebeln und hausgemachter NY-Shakesauce'],
            category: 'beef',
            price: 12.50,
        },
        {
            id: 4,
            name: 'Las Venturas Burger',
            ingredients: ['mit 125g Beef, Salat, Tomaten, Zwiebeln, Barbecue- und hausgemachter NY-Shakesauce'],
            category: 'beef',
            price: 13.00,
        },
        {
            id: 5,
            name: 'Bel-Air Burger',
            ingredients: ['mit 180g Black Angus Beef, Salat, Feta, Tomaten, karamelisierten Zwiebeln und NY-Shakesauce'],
            category: 'angus',
            price: 18.50,
        },
        {
            id: 6,
            name: 'New Austin Burger',
            ingredients: ['mit 180g Black Angus Beef, Tomaten, Salat, Cheddar, Spiegelei und Chili-Cheesesauce'],
            category: 'angus',
            price: 19.50,
        },
        {
            id: 7,
            name: 'Devastator Burger',
            ingredients: ['mit doppeltem Black Angus Beef Patty, Tomaten, Salat, Cheddar, Feta, Spiegelei, Chili-Cheese und Barbecuesauce'],
            category: 'angus',
            price: 22.50,
        },
        {
            id: 8,
            name: 'Big Ronnie Burger',
            ingredients: ['mit 3 Black Angus Patties, Tomaten, Avocado, karamelisierten Zwiebeln und NY-Shakesauce'],
            category: 'angus',
            price: 25.50,
        },
        {
            id: 9,
            name: 'Filet Surprise Burger',
            ingredients: ['mit zartem crispy Chickenfilet, Tomaten, Cheddar und NY-Shakesauce'],
            category: 'chicken',
            price: 11.50,
        },
        {
            id: 10,
            name: 'Carribean Chicken Burger',
            ingredients: ['mit zartem crispy Chickenfilet, Tomaten, Avocado, Salat, Jalapenos und Honig-Senfsauce'],
            category: 'chicken',
            price: 13.50,
        },
        {
            id: 11,
            name: 'Just Chicken Burger',
            ingredients: ['mit zwei zarten crispy Chickenfilet und NY-Shakesauce'],
            category: 'chicken',
            price: 15.50,
        },
        {
            id: 12,
            name: 'Veggie Burger',
            ingredients: ['mit Veggie Patty, Salat, Tomaten, Avocado und Zitronensaft'],
            category: 'veggie',
            price: 10.50,
        },
        {
            id: 13,
            name: 'Oh Holy Veggie Burger',
            ingredients: ['mit 3 Veggie Patties, Salat und Sweet-Chilisauce'],
            category: 'veggie',
            price: 13.50,
        }
    ];

    /******************  Category images   ********************/
    private categoryImages: { [key: string]: string } = {
        beef: '/images/beef-burger.jpg',
        angus: '/images/angus-burger.jpg',
        chicken: '/images/chicken-burger.jpg',
        veggie: '/images/veggie-burger.jpg',
      };
}
