import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {WidgetInterface, WidgetService} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';

/**
 * Represents Widget settings
 */
@Component({
  selector: 'widgets-content',
  templateUrl: './templates/widgets-content.html',
  providers: [AuthService, WidgetService],
})

export class WidgetsContent implements OnInit {
  /**
   * State of component: list or detail
   */
  @Input() state: String = 'list';
  /**
   * List of widgets belonging to user
   */
  widgetList: WidgetInterface[] = [];
  /**
   * List of applications availbale
   */
  applicationList: ApplicationInterface[] = [];
  /**
   * Index of active widget in detail state
   */
  currentWidget: Number;

  constructor(private authService: AuthService,
              private widgetService: WidgetService,
              private appService: ApplicationService) {}

  /**
   * Sets default list state and calls loadResources()
   */
  ngOnInit() {
    this.setState('list');
    this.loadResources();
  }

  /**
   * Loads widget list and application list from database
   */
  loadResources() {
    // TODO: handle error and add alerts
    this.appService.retrieveAll().subscribe(
      data => {
        this.applicationList = <ApplicationInterface[]>data['results'];
        this.widgetService.retrieveAll().subscribe(
          data => this.widgetList = <WidgetInterface[]>data['results'],
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

  /**
   * Returns true if string state represents current state of component
   */
  isState(state: String): Boolean {
    return this.state === state;
  }

  /**
   * Sets current state of component
   */
  setState(state: String) {
    this.state = state;
  }

  /**
   * Sets active widget for the detail state
   */
  setCurrentWidget(index: Number) {
    this.setState('detail');
    this.currentWidget = index;
  }

  /**
   * Finds corresponding app to its ID and returns it
   */
  findApp(id: Number): ApplicationInterface {
    console.log(this.applicationList);
    for (let i = 0; i < this.applicationList.length; i++) {
      if (this.applicationList[i].id === id) {
        console.log(this.applicationList[i]);
        return this.applicationList[i];
      }
    }
    return null;
  }

  /**
   * Returns string of YES or NO after checking existence of account in widget
   */
  hasAccount(widget: WidgetInterface) {
    if (widget.account) {
      return 'YES';
    }
    return 'NO';
  }
}
