import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface UserInterface {
  id: Number;
  username: String;
  password: String;
  email: String;
}

// TODO: error handling - username duplicities
// TODO: error handling

@Injectable()
export class UserService {
  private url = 'http://127.0.0.1:8000/users/';
  constructor(private authService: AuthService, private http: HttpClient) {}

  // Registers new user
  create(user: UserInterface) {
    this.http.post<UserInterface>('http://127.0.0.1:8000/users/register?format=api', {
     'username': user.username, 'password': user.password, 'email': user.email,
    }).subscribe(data => {
        return data;
      }, err => console.log(err)
    );
  }

  // Returns username and email of currently logged user
  retrieve() {
    return this.http.get<UserInterface>(this.url,
      { headers: this.authService.getHeaders() });
  }

  // Does not work on server side
  update(user: UserInterface) {
    return this.http.patch<UserInterface>(this.url + user.id.toString() + '/', {
     'id': user.id, 'username': user.username, 'email': user.email,
    } , { headers: this.authService.getHeaders() });
  }
}


































