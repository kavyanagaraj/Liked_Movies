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
  selected_decade;
  error;
  constructor(private _httpService: HttpService) {
  }

   ngOnInit(){
    //Checking if data exists in local storage. If it doesn't exist then sending a request to the server to get data
    if(!localStorage['movies']){
      this._httpService.get_movies()
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
    this._httpService.retrieve_review(id)
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
    this.selected_decade = decade;
  }

  //Computes the decade array for filter
  compute_decade(){
    var min_year = this.movies[0].year;
    var max_year = this.movies[0].year;
    //Gets the minimum and maximum year in the list
    for(var i = 0; i < this.movies.length; i++){
      if(min_year > this.movies[i].year){
        min_year = this.movies[i].year;
      }
      if(this.movies[i].year > max_year){
        max_year = this.movies[i];
      }
    }
    //Gives minYear and maxYear
    min_year = min_year - (min_year % 10);
    max_year = max_year - (max_year % 10);
    //Creates the decade array
    for(var i = parseInt(min_year); i <= parseInt(max_year); i += 10){
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
    catch(err) {
        return err instanceof DOMException && (
            // everything except Firefox
            err.code === 22 ||
            // Firefox
            err.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            err.name === 'QuotaExceededError' ||
            // Firefox
            err.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
  }
}
