import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountInterface, AccountService } from '../../services/account.service';

@Component({
  selector: 'accounts-content',
  templateUrl: './templates/accounts-content.html',
  providers: [ AuthService ],
})

export class AccountsContent {
  @Input() state: String = 'list';
  accountList: AccountInterface[];
  currentAccount: Number;

  constructor(private authService: AuthService, private accountService: AccountService) {}

  ngOnInit() {
    this.setState('list');
    this.getList();
  }

  getList() {
    this.accountService.retrieveAll().subscribe(
      data => {
        this.accountList = <AccountInterface[]>data['results'];
        console.log(this.accountList);
      },
      err => {
        console.log(err);
        this.setState('error');
      }
    );
  }

  setState(state: String) {
    this.state = state;
  }

  isState(state: String) {
    return state === this.state;
  }

  setCurrentAccount(account: Number) {
    this.setState('detail');
    this.currentAccount = account;
  }
}
