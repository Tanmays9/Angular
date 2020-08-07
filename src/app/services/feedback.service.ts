import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable ,of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  

submitFeedback(feed: Feedback): Observable<Feedback> {
  const httpOptions = {
    headers: new HttpHeaders({
    'Content-type': 'application/json'})
  };
  return this.http.post<Feedback>(baseURL + 'feedback/' , feed, httpOptions)
  .pipe(catchError(this.processHTTPMsgService.handleError));
   
}

}