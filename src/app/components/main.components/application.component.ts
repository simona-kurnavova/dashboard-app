import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApplicationBaseComponent} from '../../applications/application-base.component';

/**
 * Mappings of the components and their names for dynamic loading of applications
 */
export let MAPPINGS = {};

/**
 * Loads application into widget dynamically and passes necessary values to it
 */
@Component({
  selector: 'application',
  templateUrl: './templates/application.component.html',
  providers: [ApplicationService, NgbModal]
})

export class ApplicationComponent implements OnInit, OnDestroy {
  /**
   * Widget object handed from dashboard
   */
  @Input() widget: WidgetInterface;
  /**
   * State of the dashboard
   */
  @Input() dashboardState: String;
  /**
   * Application in given widget
   */
  application: ApplicationInterface;
  /**
   * Type of component to load
   */
  type: String;
  /**
   * Reference to application component for dynamic loading
   */
  private componentRef: ComponentRef<{}>;
  @ViewChild('container', { read: ViewContainerRef })
  /**
   * Reference to container for the application component to load
   */
  container: ViewContainerRef;

  /**
   * Returns component from the string name of application
   */
  static getComponentType(typeName: string) {
    return MAPPINGS[typeName];
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appService: ApplicationService,
              public popupService: NgbModal) {}

  /**
   * Calls loading of application
   */
  ngOnInit() {
    this.loadApplication();
  }

  /**
   * Loads Application component from app name and passes values
   */
  loadComponent() {
    if (this.type) {
      let componentType = ApplicationComponent.getComponentType(this.type + '-application');
      if (!componentType) {
        componentType = ApplicationComponent.getComponentType('error-application');
      }
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);

      this.componentRef = this.container.createComponent(factory);
      (<ApplicationBaseComponent>this.componentRef.instance).state = this.dashboardState;
      (<ApplicationBaseComponent>this.componentRef.instance).widget = this.widget;
    }
  }

  /**
   * Destroys component reference
   */
  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  /**
   * Retrieves application data from server
   */
  loadApplication() {

    /* NOTE: should be handled by retrieve(), but due to Firefox redirecting bug of http sites,
    for the testing purposes changed to retrieveAll() */

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
      () => {
        this.application = null;
        this.type = 'error';
      }
    );
  }

  /**
   * Checks state of the component
   */
  isState(state: String) {
    return state === this.dashboardState;
  }

  /**
   * Opens application in popup if available, otherwise opens ErrorPopupComponent
   */
  openInPopUp() {
    let popupContent = ApplicationComponent.getComponentType(this.type + '-popup');
    if (!popupContent) {
      popupContent = ApplicationComponent.getComponentType('error-popup');
    }
    this.popupService.open(popupContent, {size: 'lg'});
  }
}

