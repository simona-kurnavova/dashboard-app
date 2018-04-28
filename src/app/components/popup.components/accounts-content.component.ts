import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AccountInterface, AccountService} from '../../services/account.service';
import {ACCOUNT_DELETED_ALERT, AlertInterface, ERROR_DELETING_ACCOUNT_ALERT, SERVER_ERROR_ALERT} from '../../authentication-alerts';

@Component({
  selector: 'accounts-content',
  templateUrl: './templates/accounts-content.html',
  providers: [ AuthService ],
})

export class AccountsContent implements OnInit {
  @Input() state: String = 'list';
  public alerts: Array<AlertInterface> = [];
  accountList: AccountInterface[];
  currentAccount: number;

  constructor(private authService: AuthService,
              private accountService: AccountService) {}

  ngOnInit() {
    this.setState('list');
    this.getList();
  }

  getList() {
    this.accountService.retrieveAll().subscribe(
      data => this.accountList = <AccountInterface[]>data['results'],
      err => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  setState(state: String) {
    this.alerts = [];
    this.state = state;
  }

  isState(state: String): Boolean {
    return state === this.state;
  }

  setCurrentAccount(account: number) {
    this.setState('detail');
    this.currentAccount = account;
  }

  deleteAccount() {
    this.accountService.delete(this.accountList[this.currentAccount].id).subscribe(
      data => {
        this.setState('list');
        this.accountList.splice(this.currentAccount, 1);
        this.alerts.push(ACCOUNT_DELETED_ALERT);
      },
      err => {
        this.setState('list');
        this.alerts.push(ERROR_DELETING_ACCOUNT_ALERT);
      }
    );
  }
}
