import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'foo-details',
  providers: [AuthService],
  templateUrl: './templates/foo.component.html'
})

export class FooComponent {
  constructor() {}
  getFoo() {}
}
