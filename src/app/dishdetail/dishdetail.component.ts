import { Component, OnInit ,ViewChild, Inject, inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params , ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, MinLengthValidator } from '@angular/forms';
// import { Dishreview } from '../shared/dishreview';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { ContactComponent } from '../contact/contact.component';
import { DISHES } from '../shared/dishes';
 

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('rform') reviewFormDirective;
  dish: Dish;
  dishIDs: string[];
  prev: string;
  next: string;
  reviewForm: FormGroup;
  dishreview: Comment;

  formErrors = {
    'fullname' : '',
    'comment' : ''
  };

  validationMessages = {
    'fullname' : {
      'required' : 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength' :' Name cannot be more than 25 characters long.'
    },
    'comment' : {
      'required' : 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long.',
      'maxlength' :' Comment cannot be more than 25 characters long.'
    }
  };
  

  constructor(private dishservice : DishService ,
    private route: ActivatedRoute,
    private location: Location,
    private rfb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }

  ngOnInit() {
   this.dishservice.getDishIds()
   .subscribe((dishIDs) => this.dishIDs =dishIDs);
   this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
   
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);} );

   
  }


  createForm () : void {
    this.reviewForm = this.rfb.group({
      fullname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      rating: 5,
      comment:['',[Validators.required,Validators.minLength(2),Validators.maxLength(400)]]
    });
    this.reviewForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();//(re)set validation message now
  }

  onValueChanged(data?: any) {
    if (!this.reviewForm) {return;}
    const form = this.reviewForm;
    for (const field in this.formErrors) {
      if ( this.formErrors.hasOwnProperty(field)){
        // clear previous errors message (if any )
        this.formErrors[field] ='';
        const control =form.get(field);
        if(control && control.dirty && !control.valid){
          const messages =this.validationMessages[field];
          for(const key in control.errors){
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        }

      }
    }
  }

  onSubmit() {
    this.dishreview = this.reviewForm.value;
    console.log(this.dishreview);   // push object in comments
    this.dishreview.date = new Date().toISOString();
    

    // var obj1 ={

    // rating: this.dishreview.rating,
    // comment: this.dishreview.comment,
    // author: this.dishreview.author,
    // date: n
     
    // }
     
    this.dish.comments.push(this.dishreview);
      

    this.reviewFormDirective.resetForm();

    this.reviewForm.reset({
      fullname : '',
      rating: 5 ,
      comment: ''
    });
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