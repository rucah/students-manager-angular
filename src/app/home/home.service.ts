import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import urlJoin from 'proper-url-join';
import { Observable } from "rxjs";
import { config } from '../configs/config';
import { StudentFilter, StudentsList, Pair } from './home.model';

// This marks the class as one that participates in the dependency injection system
@Injectable({
// Angular creates a single, shared instance of HeroService and injects into any class that asks for it
  providedIn: 'root'
})
export class HomeService {

    constructor (private http: HttpClient) {}

    getStudents (filter: StudentFilter): Observable<StudentsList> {
        return this.http.get<StudentsList>(urlJoin(`${config.serverUrl}/students`, { query: filter }));
    }

    getClasses(): Observable<Pair[]> {
        return this.http.get<Pair[]>(`${config.serverUrl}/classes`);
    } 
}