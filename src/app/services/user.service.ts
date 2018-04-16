import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {BACKEND} from '../settings';

export interface UserInterface {
  id: Number;
  username: String;
  password: String;
  email: String;
}

@Injectable()
export class UserService {
  private url = BACKEND + 'users/';
  constructor(private authService: AuthService, private http: HttpClient) {}

  // Registers new user
  create(user: UserInterface) {
    return this.http.post<UserInterface>(this.url + 'register?format=json', {
     'username': user.username, 'password': user.password, 'email': user.email,
    });
  }

  // Returns username and email of currently logged user
  retrieve() {
    return this.http.get<UserInterface>(this.url,
      { headers: this.authService.getHeaders() });
  }

  // Does not work on server side yet
  update(user: UserInterface) {
    return this.http.patch<UserInterface>(this.url + user.id.toString() + '/', {
     'id': user.id, 'username': user.username, 'email': user.email,
    } , { headers: this.authService.getHeaders() });
  }
}
