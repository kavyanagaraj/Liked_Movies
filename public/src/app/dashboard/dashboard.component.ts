import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  movies = [];
  review;
  decade = [];
  selectedDecade;
  error;
  constructor(private _httpService: HttpService) {
  }

   ngOnInit(){
    //Checking if data exists in local storage. If it doesn't exist then sending a request to the server to get data
    if(!localStorage['movies']){
      this._httpService.getMovies()
      .then( data =>  { this.error = '' 
                        this.movies = data; 
                        this.compute_decade();
                        if(this.storageAvailable){
                          localStorage.setItem("movies", JSON.stringify(data))
                        }
                      })
      .catch( err => {  console.log("error in getting data",err); 
                        this.error = err
                      }); 
    }
    else{
      var movies = localStorage.getItem('movies');
      if(movies){
        this.movies = JSON.parse(movies); 
        this.compute_decade();      
      }
    }
  }

  //Triggers when the list is clicked to get review of a movie
  get_review(id: any){
    this._httpService.retrieveReview(id)
    .then( data => {  this.review = data; 
                      this.error = '' 
                    })
    .catch( err => {  this.error = err;
                      console.log("error in getting data",err);
                   }); 
  }

  //To open rotten tomato site in a new tab when link is clicked
  goto_url(url: string){
    window.open(url, "_blank");
  }

  //Sets the decade to be filtered on click
  filter_decade(decade){
    this.selectedDecade = decade;
  }

  //Computes the decade array for filter
  compute_decade(){
    var minYear = this.movies[0].year;
    var maxYear = this.movies[0].year;
    //Gets the minimum and maximum year in the list
    for(var i = 0; i < this.movies.length; i++){
      if(minYear > this.movies[i].year){
        minYear = this.movies[i].year;
      }
      if(this.movies[i].year > maxYear){
        maxYear = this.movies[i];
      }
    }
    //Gives minYear and maxYear
    minYear = minYear - (minYear % 10);
    maxYear = maxYear - (maxYear % 10);
    //Creates the decade array
    for(var i = parseInt(minYear); i <= parseInt(maxYear); i += 10){
      this.decade.push(i);
    }
    return this.decade;
  }

  //Checking if local storage is available
  storageAvailable(type) {
    try {
        var storage = window[type],
        x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
  }
}
