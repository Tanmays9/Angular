import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  
  selectedDish: Dish ;
  


  constructor(private deshService: DishService) { }

  ngOnInit() {
   
    this.dishes = this.deshService.getDishes();
    
   

  }

  onSelect(dish: Dish) {
    
    this.selectedDish = dish;
  }  
 

}
