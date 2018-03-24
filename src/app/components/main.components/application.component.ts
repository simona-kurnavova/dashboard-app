import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {WidgetInterface} from '../../services/widget.service';
import {ApplicationInterface, ApplicationService} from '../../services/application.service';

@Component({
  selector: 'dummy-app',
  template: `<div>Dummy app</div>`
})
export class DummyApplicationComponent {}

@Component({
  selector: 'application',
  templateUrl: './templates/application.component.html',
})

export class ApplicationComponent implements OnInit, OnDestroy {
  @Input() widget: WidgetInterface;
  application: ApplicationInterface;

  type = 'dummy-app'; // TODO: application.name

  private componentRef: ComponentRef<{}>;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private mappings = {
    'dummy-app': DummyApplicationComponent,
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appService: ApplicationService) {}

  ngOnInit() {
    this.loadApplication();
    if (this.type) {
      let componentType = this.getComponentType(this.type);
      let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = this.container.createComponent(factory);
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  getComponentType(typeName: string) {
    const type = this.mappings[typeName];
    return type;
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
}

