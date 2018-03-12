import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'accounts-content',
  templateUrl: './templates/accounts-content.html',
  providers: [ AuthService ],
})

export class AccountsContent {
  constructor(private service: AuthService) {}
}
