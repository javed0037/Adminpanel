import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form: FormGroup;
  constructor(
  
    private router: Router
  ) {  }

 


  ngOnInit() {
  }

}
