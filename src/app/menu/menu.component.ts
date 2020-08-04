import { Component, OnInit,inject, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  
 
  


  constructor(private deshService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
   
    this.deshService.getDishes() 
    .subscribe((dishes) => this.dishes =dishes );

    
    
   

  }

 
 

}
