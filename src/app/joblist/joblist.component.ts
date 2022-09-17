import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.scss']
})
export class JoblistComponent implements OnInit {

  constructor(private apiService: ApiService, private router:Router) { }

  errorMessage: string;
  jobsPosted:Array<any> = [];
  noOfPages: number;
  currentPage:number = 1;
  disableNext:boolean = false;
  disablePrev:boolean = false;
  jobId: string;
  applicants:Array<any> = [];

  ngOnInit(): void {
    this.getJobs()
  }

  getJobs(){
    this.apiService.getPostedJobs(this.currentPage).subscribe({
      next: (response) => {
        this.jobsPosted = response?.data?.data
        this.noOfPages = Math.ceil(response?.data?.metadata?.count / response?.data?.metadata?.limit)
        console.log(response, this.noOfPages)
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.error.message
      }
    })
  }

  nextPage(){
    if(this.currentPage !== this.noOfPages){
      this.currentPage +=1
      this.getJobs()
      if(this.currentPage === this.noOfPages) this.disableNext=true;
    }
  }

  prevPage(){
    if(this.currentPage !== 1){
      this.currentPage -=1
      this.getJobs()
      if(this.currentPage === 1) this.disablePrev=true;
    }
  }

  viewApp(id:string){
    this.jobId = id
    this.apiService.getApplicants(this.jobId).subscribe({
      next: (response) => {
        console.log(response)
        this.applicants = response?.data
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.error.message
      }
    })
  }

  goToHome(){
    this.router.navigateByUrl('/')
  }


}
