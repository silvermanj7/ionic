import { Component, ViewChild, NgModule } from '@angular/core';
import { IonicModule, MenuController, NavController, AlertController, Nav } from '../../../dist';


@Component({
  templateUrl: 'page1.html'
})
export class Page1 {
  constructor(private nav: NavController, private alertCtrl: AlertController) {}

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      message: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      cssClass: 'my-alert',
      buttons: ['Ok']
    });
    alert.present();
  }

  goToPage2() {
    this.nav.push(Page2);
  }
}


@Component({templateUrl: 'page3.html'})
export class Page3 {}


@Component({templateUrl: 'page2.html'})
export class Page2 {
  constructor(private nav: NavController) {}

  page3() {
    this.nav.push(Page3);
  }
}


@Component({
  templateUrl: 'main.html'
})
export class E2EPage {
  rootPage: any;
  changeDetectionCount: number = 0;
  pages: Array<{title: string, component: any}>;
  @ViewChild(Nav) nav: Nav;

  constructor(private menu: MenuController) {
    this.rootPage = Page1;

    this.pages = [
      { title: 'Page 1', component: Page1 },
      { title: 'Page 2', component: Page2 },
      { title: 'Page 3', component: Page3 },
    ];
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component).then(() => {
      // wait for the root page to be completely loaded
      // then close the menu
      this.menu.close();
    });
  }

  openRightMenu() {
    this.menu.open('right');
  }

  openLeftMenu() {
    this.menu.open('left');
  }

  onDrag(ev: any) {
    console.log('Menu is being dragged', ev);
  }

  onOpen(ev: any) {
    console.log('Menu is open', ev);
  }

  onClose(ev: any) {
    console.log('Menu is closed', ev);
  }

  isChangeDetecting() {
    console.log('Change detection', ++this.changeDetectionCount);
    return true;
  }
}

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class E2EApp {
  rootPage = E2EPage;
}

@NgModule({
  declarations: [
    E2EApp,
    E2EPage,
    Page1,
    Page2,
    Page3
  ],
  imports: [
    IonicModule.forRoot(E2EApp)
  ],
  entryComponents: [
    E2EApp,
    E2EPage,
    Page1,
    Page2,
    Page3
  ]
})
export class AppModule {}
