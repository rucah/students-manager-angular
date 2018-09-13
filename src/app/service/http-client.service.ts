import { Injectable } from '@angular/core';

// This marks the class as one that participates in the dependency injection system
@Injectable({
// Angular creates a single, shared instance of HeroService and injects into any class that asks for it
  providedIn: 'root'
})
export class HttpClientService {

  constructor() { }

  login(username, password): boolean {
    if(username === 'test' && password === 'test') {
      return true;
    }
    return false;
  }
}
