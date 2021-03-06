import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { delay } from 'rxjs/operators';
import { FeedbackService } from '../services/feedback.service';
import { flyInOut, expand, visibility } from '../animations/app.animation';

import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'

  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  feedspin: Feedback;
  feedcopy: Feedback;
  errMess:string;
  feedcopyhide: Feedback;
  loading: boolean = false;
  contactType = ContactType;



  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'First Name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Last Name must contain only numbers.',
    },
    'email': {
      'required': 'Last Name is required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feed: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: 'false',
      contacttype: 'Nope',
      message: ''

    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set validation messages now

  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous errors message (if any )
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        }

      }
    }
  }

  


  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedspin = this.feedbackForm.value;
    this.loading = true
    console.log('feedbackform:' , this.feedbackForm);
    this.feed.submitFeedback(this.feedspin)
      .pipe(delay(500))
      .subscribe(feedcopy => {
        this.feedcopy = feedcopy;
      },
      errmess => { this.feedcopy = null; this.errMess = <any>errmess;});

      setTimeout(()  => {
        this.resetForm();
      }, 5000);
    console.log(this.feedback);


  }

  resetForm(){
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
    this.feedcopy = null;
    this.loading = false;

  }
  

  



}
