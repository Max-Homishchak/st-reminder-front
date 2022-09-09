import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visitor } from './visitor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public add(visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(`${this.apiServerUrl}/add`, visitor);
  }

  public sendCode(email: String): Observable<void>{

    const url = `${this.apiServerUrl}/send/${email}`;
    
    return this.http.post<void>(url, email);
  }

  public checkCode(email: String, verificationCode: number): Observable<void> {

    const url = `${this.apiServerUrl}/checkCode/${email}/${verificationCode}`;

    return this.http.post<void>(url, email);
  }

  public updateVisitor(visitor: Visitor): Observable<Visitor> {

    const url = `${this.apiServerUrl}/update`;

    return this.http.post<Visitor>(url, visitor);
  }

  public checkEmail(email: String): Observable<Visitor> {
    
    const url = `${this.apiServerUrl}/checkEmail/${email}`;

    return this.http.get<Visitor>(url);
  }
}
