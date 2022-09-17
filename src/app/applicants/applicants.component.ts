import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  @Input() id:string;
  errorMessage:string;
  @Input() applicantsList:Array<any> = [];

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

}
