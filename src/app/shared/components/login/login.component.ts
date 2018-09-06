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
  FormControl;
  public loading = false;


  constructor(
    private formBuilder: FormBuilder,
    // private formcontrol: FormControl,
    private authService: AuthService,
    private router: Router,
  ) 
  
  { }


    // Function to create registration form
    // createForm() {
    //   this.form = this.formBuilder.group({
    //     // Email Input
    //     email: ['', Validators.required ],
       
    //     // Password Input
    //     password: ['', Validators.required],
       
    //   }); 
    // }
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
       console.log(data.data._id,'theeeeeeeeeeeeee')
                  this.messageClass = 'alert alert-success';
                  this.message = data.message;
                  this.authService.setToken('fake');
                  this.authService.storeUserData(data.data._id);
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

    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }

    this.form = this.formBuilder.group({
      // Email Input
      email: ['', Validators.required ],
     
      // Password Input
      password: ['', Validators.required],
     
    }); 
  

  }

}