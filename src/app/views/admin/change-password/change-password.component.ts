import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/admin/admin.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
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
  createForm() {
    this.form = this.formBuilder.group({
      password: ['', ],
      changePassword:['']
    })
  }
  onResetsubmit() {
    var jj=localStorage.getItem('user');
    jj = jj.replace(/"/g,"");
    var ff=parseInt(jj)
    const user = {
    adminId :  jj,
     newPassword: this.form.get('password').value,
     confirmNewPassword: this.form.get('changePassword').value


    }
    console.log("ther are the userId that passed",user.adminId)
    console.log(user,"kamal")
    this.authService
      .changepassword(user)
      .subscribe(data => {
        console.log("there are the data",data)
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 1000);


        })
  }
  ngOnInit() {
  }

}
