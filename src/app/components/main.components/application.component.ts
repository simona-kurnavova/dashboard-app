import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationBaseComponent} from '../../applications/application-base.component';

export let MAPPINGS = {};

@Component({
  selector: 'application',
  templateUrl: './templates/application.component.html',
})

export class ApplicationComponent implements OnInit, OnDestroy {
  @Input() widget: WidgetInterface;
  @Input() dashboardState: String;
  applicationState: String;

  application: ApplicationInterface;
  type;

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
  }

  loadComponent() {
    if (this.type) {
      let componentType = ApplicationComponent.getComponentType(this.type + '-application');
      if (!componentType) {
        componentType = ApplicationComponent.getComponentType('error-application');
      }
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);

      this.componentRef = this.container.createComponent(factory);
      (<ApplicationBaseComponent>this.componentRef.instance).state = this.applicationState;
      (<ApplicationBaseComponent>this.componentRef.instance).widget = this.widget;
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  loadApplication() {
    // Solved Firefox unabillity to perform redirection with retrieveAll() replacing retrieve()
    this.appService.retrieveAll().subscribe(
      data => {
        const applications = <ApplicationInterface[]>data['results'];
        for (let i = 0; i < applications.length; i++) {
          if (this.widget.app === applications[i].id) {
            this.application = applications[i];
            this.type = applications[i].name;
          }
        }

        this.loadComponent();
      },
      err => console.log(err)
    );
  }

  initState() {
    this.setState(this.dashboardState);
  }

  setState(state: String) {
    this.applicationState = state;
  }

  isState(state: String) {
    return state === this.applicationState;
  }

  openInPopUp() {
    const popupContent = ApplicationComponent.getComponentType(this.type + '-popup');
    const popup = this.popupService.open(popupContent, {size: 'lg'});
  }
}

