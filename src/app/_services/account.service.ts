import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public get userValue(): User {
    return this.userSubject.value;
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(username, password) {
    return this.http.post<User>('/api/user/auth', { username, password })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post<User>('/api/user/register', user);
  }

  getAll() {
    return this.http.get<User[]>('/api/user')
  }

  getById(id: string) {
    return this.http.get<User>(`/api/user/${id}`);
  }

  update(id: string, params) {
    return this.http.put(`/api/user/${id}`, params)
      .pipe(map(x => {
        if(id === this.userValue.id) {
          let user = { ...this.userValue, params };
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`/api/user/${id}`)
      .pipe(map(x => {
        if(id === this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }

}
