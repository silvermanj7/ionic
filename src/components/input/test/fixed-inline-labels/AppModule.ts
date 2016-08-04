import { Component, NgModule } from '@angular/core';
import { IonicModule } from '../../../dist';


@Component({
  templateUrl: 'main.html'
})
export class PageOne {
  url: string;
  input1: string = 'Text 1';

  onEvent(event: any) {
    console.log('Did Event:', event.type);
  }
}

@Component({
  template: '<ion-nav [root]="root"></ion-nav>'
})
export class E2EApp {
  root = PageOne;
}

@NgModule({
  declarations: [
    E2EApp,
    PageOne
  ],
  imports: [
    IonicModule.forRoot(E2EApp)
  ],
  entryComponents: [
    PageOne
  ]
})
export class AppModule {}
