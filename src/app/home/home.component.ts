import { Component, OnInit ,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style' : 'display: block;'

  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess:string;
  promotion: Promotion;
  promoErrMess:string;
  leader: Leader;
  leadErrMess: string;

  constructor( private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject ('BaseURL') private BaseURL) { }

  ngOnInit() {
     this.dishservice.getFeaturedDish()
     .subscribe((dishes) => this.dish =dishes ,
     errmess1 => this.dishErrMess =<any>errmess1) ;


     this.promotionservice.getFeaturedPromotion()
     .subscribe((promotion) => this.promotion = promotion,
     errmess2 => this.promoErrMess =<any>errmess2) ;

     
     this.leaderservice.getFeaturedLeader()
     .subscribe((leader) => this.leader = leader,
     errmess3 => this.leadErrMess =<any>errmess3);
  }

}
