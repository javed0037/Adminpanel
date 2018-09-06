// import { environment } from './../../../environments/environment.prod';
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
  userId;
  options;
  Authorization;
  constructor(
    private http: Http,
    // private jwtHelper: JwtHelperService
  ) { }

// Function to create headers, add token, to be used in HTTP requests
 createAuthenticationHeaders() {
  this.options = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json', // Format set to JSON    
    })
  });
 }


 
 login(user) {
 console.log(user)
  let headers = new Headers();
  this.createAuthenticationHeaders();
  return this.http.post(environment.baseUrl+'/admin/adminLogin',user,this.options).pipe(map(res => res.json()));
}




editProfile(formData) {
 
  this.createAuthenticationHeaders(); // Create headers
  return this.http.post(environment.baseUrl+'/admin/addNewUser', formData, this.options).pipe(map(res => res.json()));
  
}

changepassword(user) {
  // console.log(user,"erfbejhrgbWWWWWWWWWWWWWWWWW")
  this.createAuthenticationHeaders();
  return this.http.post(environment.baseUrl+'/dashboard/changePassword',user, this.options).pipe(map(res => res.json()));
}

 forgotpassword(user) {
console.log(user,"erfbejhrgb")
    this.createAuthenticationHeaders();
    return this.http.post(environment.baseUrl+'/admin/forgotPassword',user, this.options).pipe(map(res => res.json()));
  }
  
 //  // Function to logout
  logout() {
    localStorage.clear(); // Clear local storage
  }

  setToken(token){
    localStorage.setItem('LoggedInUser',token);
  }

  isLoggedIn(){

    if(localStorage.getItem('LoggedInUser')){
       return true;
    }
    else
      return false;

  }

  // Function to store user's data in client local storage
  storeUserData(user) {
    // localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.userId = user; // Set user to be used elsewhere
  }




}

