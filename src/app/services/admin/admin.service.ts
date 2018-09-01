//import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  domain = environment.baseUrl; // Development Domain
  authToken;
  user;
  options;
  Authorization;
  constructor(
    private http: Http,
    // private jwtHelper: JwtHelperService
  ) { }

// Function to create headers, add token, to be used in HTTP requests
 createAuthenticationHeaders() {
  this.loadToken(); // Get token so it can be attached to headers
  this.options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json', // Format set to JSON    
      'accesstoken': this.authToken // Attach token
    })
  });
 }


  loadToken() {
    this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
  }

 
 login(user) {
 console.log(user)
  let headers = new Headers();
  this.createAuthenticationHeaders();
  return this.http.post('http://18.219.244.162:3000/admin/adminLogin',user,this.options).pipe(map(res => res.json()));
}



editProfile(formData) {
 
  this.createAuthenticationHeaders(); // Create headers
  return this.http.post(this.domain+'/admin/edit_profile',formData, this.options).pipe(map(res => res.json()));
}

changepassword(user) {
  this.createAuthenticationHeaders();
  return this.http.post(this.domain+'/admin/changePassword',user, this.options).pipe(map(res => res.json()));
}

 forgotpassword(user) {
  

    this.createAuthenticationHeaders();
    return this.http.post(this.domain+'/admin/forgot-password',user, this.options).pipe(map(res => res.json()));
  }
  
 //  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }



  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }


   loggedIn() {
return this.loadToken()!=null
  }
 


}

