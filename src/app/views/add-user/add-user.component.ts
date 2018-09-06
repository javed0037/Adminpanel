import {
    Component,
    OnInit
} from '@angular/core';
// import $ as 'jquery'
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import {
    Router
} from '@angular/router';
import {
    AuthService
} from '../.././services/admin/admin.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as _ from 'lodash';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    messageClass;
    public loader: boolean;
    message;
    processing = false;
    form: FormGroup;
    previousUrl;
    fileContainers;
    uploadContainerCount = 1;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) {
        this.createForm()
        this.fileContainers = Array.from({ length: this.uploadContainerCount }, () => Math.floor(Math.random() * this.uploadContainerCount));
    }
    // Function to create forgot form
    createForm() {
        this.form = this.formBuilder.group({
            email: ['',],
            name: ['',],
            gender: ['',],
            country: ['',],
            status: ['',],
            discription: ['',],
            date: ['',],
            city: ['',],
            abountMe: ['',],
            Occupation: ['',],
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
        console.log(user, 'qrqwrqWRQWEQ3e')

        this.updateProfile(user);
    }

    files = [];
    pushFiles = [];
    found(event) {
        this.files.push(event.target.files);
    }




    incrementUploadView() {
        console.log('Upload view increment')
        ++this.uploadContainerCount;
        this.fileContainers = Array.from({ length: this.uploadContainerCount }, () => Math.floor(Math.random() * this.uploadContainerCount));
    }

    updateProfile(user) {
        console.log(this.pushFiles);
        console.log(this.files);
        var formData = new FormData();
        console.log(this.files)
        for (let i = 0; i < this.files.length; i++) {
                console.log('here')
            for (let j = 0; j < this.files[i].length; j++){
                console.log('there')
                formData.append('ProfileImage[]', this.files[i][j])
            }
        }
        //   for(let i=0; i<this.files.length; i++)
        //     formData.append('ProfileImage[]', this.files[i],this.files[i].name);
        _.forEach(user, (value, key) => {
            formData.append(key, value);
        })
        console.log('ther are the formData', formData);
        this.http.post(environment.baseUrl+'/admin/addNewUser', formData)
            .subscribe(data => {
                console.log('there 55555555555555are the data', data)
                this.messageClass = 'alert alert-success';
                // this.message = data.message;
                console.log('there 55555555555555are the data', data)
                setTimeout(() => {
                    if (this.previousUrl) {
                        this.router.navigate([this.previousUrl]);
                    } else {
                        this.router.navigate(['/dashboard']);
                    }
                }, 1000);
            },
                error => {
                    console.log(error);
                    this.message = error.error.message;
                    setTimeout(() => {
                        this.message = "";
                    }, 2000)
                    // let err= JSON.parse(error._body).message;
                    //    if(error) this.message = error['message'];
                    //    else this.message = 'Something went wrong';
                    //               this.messageClass = 'alert alert-danger';
                    //               this.message = err;
                    // this.processing = false;
                })

    }

    ngOnInit() {

    }
}