import { Component, OnInit,inject, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand, visibility } from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style' : 'display: block;'

  },
  animations:[
    flyInOut(),
    expand()
    
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  
 
  


  constructor(private deshService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
   
    this.deshService.getDishes() 
    .subscribe((dishes) => this.dishes = dishes,
    errmess => this.errMess = <any> errmess );

    
    
   

  }

 
 

}
