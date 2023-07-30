import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { Users } from '../components/users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getData(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + endpoint);
  }
}
