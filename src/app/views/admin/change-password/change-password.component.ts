import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form: FormGroup;
  
   
  constructor( private formBuilder: FormBuilder,
 
    private router: Router) {}
    
  ngOnInit() {
  }

}
