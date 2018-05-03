import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AccountInterface, AccountService} from '../../services/account.service';
import {ACCOUNT_DELETED_ALERT, AlertInterface, ERROR_DELETING_ACCOUNT_ALERT, SERVER_ERROR_ALERT} from '../../alert-definitions';

/**
 * Contents of settings section
 * List of account owned by user
 */
@Component({
  selector: 'accounts-content',
  templateUrl: './templates/accounts-content.html',
  providers: [AuthService, AccountService],
})

export class AccountsContent implements OnInit {
  /**
   * state of section: list or detail of account
   */
  @Input() state: String = 'list';
  /**
   * List of alerts passed to AlertComponent for error handling
   */
  public alerts: Array<AlertInterface> = [];
  /**
   * List of accounts owned by user
   */
  public accountList: AccountInterface[];
  /**
   * Active account for detail mode
   */
  public currentAccount: number;

  constructor(private authService: AuthService,
              private accountService: AccountService) {}

  /**
   * Sets default state and calls loadResources()
   */
  ngOnInit() {
    this.setState('list');
    this.getList();
  }

  /**
   * Retrieves list of accounts and parse them to accountList
   */
  getList() {
    this.accountService.retrieveAll().subscribe(
      data => this.accountList = <AccountInterface[]>data['results'],
      () => this.alerts.push(SERVER_ERROR_ALERT)
    );
  }

  /**
   * Sets state of the component
   */
  setState(state: String) {
    this.alerts = [];
    this.state = state;
  }

  /**
   * Returns true if given string argument with correct current state
   */
  isState(state: String): Boolean {
    return state === this.state;
  }

  /**
   * Sets currentAccount for the detail state
   */
  setCurrentAccount(account: number) {
    this.setState('detail');
    this.currentAccount = account;
  }

  /**
   * Deletes chosen currentAccount
   */
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
