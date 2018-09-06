import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/admin/admin.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
admins;
profileImage;
url=environment.baseUrl;
name;
  constructor(
    private authservice: AuthService,
    private router: Router,
  ) { }
  
logout(){
    this.authservice.logout();
    this.router.navigate(['/login'])
}

  ngOnInit() {

  }

}