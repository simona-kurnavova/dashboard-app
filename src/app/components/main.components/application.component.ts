import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

export const MAPPINGS = {};

@Component({
  selector: 'application',
  templateUrl: './templates/application.component.html',
})

export class ApplicationComponent implements OnInit, OnDestroy {
  @Input() widget: WidgetInterface;
  @Input() dashboardState: String;
  applicationState: String;

  application: ApplicationInterface;
  type = 'calendar'; // TODO: application.name
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
    this.initState();

    if (this.type) {
      let componentType = ApplicationComponent.getComponentType(this.type + '-application');
      if (!componentType) {
        componentType = ApplicationComponent.getComponentType('error-application');
      }
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = this.container.createComponent(factory);
    }
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

  initState() {
    if (this.widget.account) {
      this.setState(this.dashboardState);
    } else {
      if (this.application.required_account) {
        this.setState('noAccount');
      } else {
        this.setState(this.dashboardState);
      }
    }
    this.setState('noAccount'); // TODO: delete
  }

  setState(state: String) {
    this.applicationState = state;
  }
  isState(state: String) {
    return state === this.applicationState;
  }

  addAccount() {
    const popupContent = ApplicationComponent.getComponentType(this.type + '-add-account');
    const popup = this.popupService.open(popupContent, {size: 'lg'});
  }

  openInPopUp() {
    const popupContent = ApplicationComponent.getComponentType(this.type + '-popup');
    const popup = this.popupService.open(popupContent, {size: 'lg'});
  }
}

