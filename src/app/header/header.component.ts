import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showDrop:boolean = false;

  constructor(public apiService:ApiService, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  openDropDown(){
    this.showDrop = !this.showDrop
  }

  logOut(){
    this.apiService.logginedUser.next(null)
    localStorage.removeItem('token')
    this.toastr.success('You have successfully logged out.', 'LogOut', {
      timeOut: 5000,
      closeButton: true,
      tapToDismiss: false,
    });
    this.router.navigateByUrl('/')
  }

}
