import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
 

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
 
  dish: Dish;
  dishIDs: string[];
  prev: string;
  next: string;
  

  constructor(private dishservice : DishService ,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
   this.dishservice.getDishIds()
   .subscribe((dishIDs) => this.dishIDs =dishIDs);
   this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
   
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);} );
  }

  setPrevNext(dishId : string ) {
    const index = this.dishIDs.indexOf(dishId);
    this.prev=this.dishIDs[(this.dishIDs.length + index - 1) % this.dishIDs.length];
    this.next=this.dishIDs[(this.dishIDs.length + index + 1) % this.dishIDs.length];
  }

  goBack(): void {
    this.location.back();
  }

}
//{{ (6 + 1 -1 )% 6}}