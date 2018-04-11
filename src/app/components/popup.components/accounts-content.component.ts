import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AccountInterface, AccountService } from '../../services/account.service';
import {ACCOUNT_DELETED_ALERT, AlertInterface, ERROR_DELETING_ACCOUNT_ALERT} from '../../authentication-alerts';
import {WidgetInterface, WidgetService} from '../../services/widget.service';

@Component({
  selector: 'accounts-content',
  templateUrl: './templates/accounts-content.html',
  providers: [ AuthService ],
})

export class AccountsContent implements OnInit {
  public alerts: Array<AlertInterface> = [];
  @Input() state: String = 'list';
  accountList: AccountInterface[];
  currentAccount: number;

  constructor(private authService: AuthService,
              private accountService: AccountService,
              private widgetService: WidgetService) {}

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
    this.alerts = [];
    this.state = state;
  }

  isState(state: String) {
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

  public closeAlert(alert: AlertInterface) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
