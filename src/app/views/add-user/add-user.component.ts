import { Component, OnInit } from '@angular/core';
// import $ as 'jquery'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
form:FormGroup
  constructor(
    private formBuilder: FormBuilder,
  )
  

  { this.createForm(); }
  // Function to create forgot form
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', ],
      name : ['', ],
      gender: ['', ],
      country : ['', ],
      status: ['', ],
      discription : ['', ],
      date :  ['',],
      city : ['',],
      abountMe : ['',],
    })
  }
  submit() {

      const user = {
        email: this.form.get('email').value,
        name: this.form.get('name').value,
        gender: this.form.get('gender').value,
        country: this.form.get('country').value,
        status: this.form.get('status').value,
        discription: this.form.get('discription').value,
        date: this.form.get('date').value,
        city: this.form.get('city').value,
        abountMe: this.form.get('abountMe').value
      }
      console.log(user,'qrqwrqWRQWEQ3e')
    }

    found(event){
      console.log(event.target.files[0].name,'e2s2esd2w')
    }

  ngOnInit() {
  }

}
