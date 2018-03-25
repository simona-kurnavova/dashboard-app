import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarApplicationComponent} from '../../applications/calendar-application/calendar-application.component';

export const MAPPINGS = {};

@Component({
  selector: 'dummy-app',
  template: `<div>Dummy app</div>`
})
export class DummyApplicationComponent {}
MAPPINGS['dummy'] = DummyApplicationComponent;

@Component({
  selector: 'application',
  templateUrl: './templates/application.component.html',
})

export class ApplicationComponent implements OnInit, OnDestroy {
  @Input() widget: WidgetInterface;
  @Input() dashboardState: String;
  applicationState: String;

  application: ApplicationInterface;
  type = 'calendar-application'; // TODO: application.name
  private componentRef: ComponentRef<{}>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  static getComponentType(typeName: string) {
    return MAPPINGS[typeName];
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appService: ApplicationService,
              public popupService: NgbModal) {}

  ngOnInit() {
    this.loadApplication();
    this.setState();

    if (this.type) {
      let componentType = ApplicationComponent.getComponentType(this.type);
      if (!componentType) {
        componentType = ApplicationComponent.getComponentType('error-application');
      }
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = this.container.createComponent(factory);
    }
    this.setState();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  loadApplication() {
    this.appService.retrieve(this.widget.app).subscribe(
      data => {
        console.log(data);
        this.application = <ApplicationInterface>data;
      },
      err => console.log(err)
    );
  }

  /* possible states: normal, edit, noAccount */
  setState() {
    if (this.widget.account) {
      this.applicationState = this.dashboardState;
    } else {
      if (this.application.required_account) {
        this.applicationState = 'noAccount';
      } else {
        this.applicationState = this.dashboardState;
      }
    }
    this.applicationState = 'noAccount'; // TODO: delete
  }

  isState(state: String) {
    return state === this.applicationState;
  }

  addAccount() {
    const popupContent = ApplicationComponent.getComponentType('calendar-add-account');
    const popup = this.popupService.open(popupContent, { size: 'lg', });
  }
}

