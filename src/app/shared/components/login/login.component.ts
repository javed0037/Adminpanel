import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';
// import { AuthGuard } from '../../../guards/auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  
  {this.createForm(); }


    // Function to create registration form
    createForm() {
      this.form = this.formBuilder.group({
        // Email Input
        email: ['', ],
       
        // Password Input
        password: [''],
       
      }); 
    }
      
     
    
      onLoginsubmit() {
        this.processing = true; 
        // this.enableForm(); // Re-enable form
      
        const user = {
          email: this.form.get('email').value, 
          password: this.form.get('password').value ,
        }
          
        this.authService
          .login(user)
          .subscribe(data => {
 console.log(data.token)
                  this.messageClass = 'alert alert-success'; 
                  this.message = data.message; 
                  this.authService.storeUserData(data.token, data.data);
                  setTimeout(() => {
                    if (this.previousUrl) {
                      this.router.navigate([this.previousUrl]); 
                    } else {
                      this.router.navigate(['/dashboard']);
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