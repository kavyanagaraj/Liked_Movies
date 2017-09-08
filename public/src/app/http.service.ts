import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class HttpService {

  constructor(private _http: Http) { 
  }
  //Service to make a get request to the route /movies to retrieve all the movies
  getMovies(){
    return this._http.get('/movies')
    .map(data => data.json())
    .toPromise();
  }

  //Service to make a http request to the route /review/id to retrieve the review of the movie with the id in the url
  retrieveReview(id){
    return this._http.get(`/review/${id}`)
    .map(data => data.json())
    .toPromise();
  }
}
