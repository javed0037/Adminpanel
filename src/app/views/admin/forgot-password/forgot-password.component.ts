import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  messageClass;
   public loader: boolean;
   message;
   processing = false;
   form: FormGroup;
   previousUrl;
   public loading = false;
   constructor(
     private formBuilder: FormBuilder,
     private authService: AuthService,
     private router: Router,
   )
   { this.createForm(); }
     // Function to create forgot form
     createForm() {
       this.form = this.formBuilder.group({
         email: ['', ]
       })
     }
     onForgetsubmit() {
  
         const user = {
           email: this.form.get('email').value
         }
         this.authService
           .forgotpassword(user)
           .subscribe(data => {
             console.log("there are the data",data.message)

                   this.messageClass = 'alert alert-success';
                   this.message = data.message;
                   setTimeout(() => {
                     if (this.previousUrl) {
                       this.router.navigate([this.previousUrl]);
                     } else {
                       this.router.navigate(['/login']);
                     }
                   }, 1000);
             
               
             }, error=> {
               
 let err= JSON.parse(error._body).message;
 
        if(error) this.message = error['message'];
        else this.message = 'Something went wrong';
                   this.messageClass = 'alert alert-danger'; 
                   this.message = err; 
                   // this.processing = false; 
                 
               
             });
       }
   
   ngOnInit() {
    
   
 
   }
 
 }