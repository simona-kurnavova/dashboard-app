import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface UserInterface {
  username: String;
  password: String;
  email: String;
}

// TODO: error handling - username duplicities
// TODO: error handling

@Injectable()
export class UserService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  create(user: UserInterface) {
    this.http.post<UserInterface>('http://127.0.0.1:8000/users/register?format=api', {
     'username': user.username, 'password': user.password, 'email': user.email,
    }).subscribe(data => {
        return data;
      }, err => console.log(err)
    );
  }
}

















