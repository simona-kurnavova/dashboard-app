import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {ErrorApplicationComponent} from '../../applications/error-application/error-application.component';

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
  type = 'error-application'; // TODO: application.name
  private componentRef: ComponentRef<{}>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  static getComponentType(typeName: string) {
    const type = MAPPINGS[typeName];
    return type;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appService: ApplicationService) {}

  ngOnInit() {
    this.loadApplication();
    if (this.type) {
      const componentType = ApplicationComponent.getComponentType(this.type);
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
  }
}

