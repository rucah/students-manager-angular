import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { config } from '../configs/config'

// This marks the class as one that participates in the dependency injection system
@Injectable({
// Angular creates a single, shared instance of HeroService and injects into any class that asks for it
  providedIn: 'root'
})
export class LoginService {

    constructor (private http: HttpClient) {}

    login (username: string = '', password: string = ''): Observable<Object> {
        return this.http.get<any>(`${config.serverUrl}/login/${username}/${password}`)
    }
}