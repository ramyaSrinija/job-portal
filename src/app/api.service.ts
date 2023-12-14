import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public httpClientObj:HttpClient) { }

  logginedUser = new BehaviorSubject(null)
  user = localStorage.getItem('user')
  localUser = new BehaviorSubject(this.user)

  loginUser(userObj:object):Observable<any>{
    return this.httpClientObj.post<any>("https://jobs-api.squareboat.info/api/v1/auth/login",userObj)
  }

  getPostedJobs(pageNumber:Number):Observable<any>{
    return this.httpClientObj.get<any>(`https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page=${pageNumber}`)
  }

  getApplicants(id:string):Observable<any>{
    return this.httpClientObj.get<any>(`https://jobs-api.squareboat.info/api/v1/recruiters/jobs/${id}/candidates`)
  }
}