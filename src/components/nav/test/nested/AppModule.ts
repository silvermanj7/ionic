import { Component, ViewChild, NgModule } from '@angular/core';
import { IonicModule, NavController, MenuController, Config, Nav, App } from '../../../dist';


@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Login</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content style="text-align:center;" padding>
      <p><button (click)="goToAccount()">Login</button></p>
      <p><button (click)="goBack()">App goBack()</button></p>
    </ion-content>
  `
})
export class Login {
  constructor(private nav: NavController, private app: App) {}

  goToAccount() {
    this.nav.push(Account);
  }

  goBack() {
    this.app.navPop();
  }
}


@Component({
  template: `
    <ion-menu [content]="content">
     <ion-header>
      <ion-toolbar secondary>
        <ion-title>Account Menu</ion-title>
      </ion-toolbar>
     </ion-header>
     <ion-content>
       <ion-list>
         <button ion-item (click)="goToProfile()">
           Profile
         </button>
         <button ion-item (click)="goToDashboard()">
           Dashboard
         </button>
         <button ion-item detail-none (click)="logOut()">
           Logout
         </button>
         <button ion-item detail-none (click)="goBack()">
           App Go Back
         </button>
       </ion-list>
     </ion-content>
    </ion-menu>

    <ion-nav #accountNav #content [root]="root" swipeBackEnabled="false"></ion-nav>
  `
})
export class Account {
  @ViewChild('accountNav') accountNav: Nav;

  root = Dashboard;

  constructor(private menu: MenuController, private app: App) {}

  goToProfile() {
    this.accountNav.setRoot(Profile).then(() => {
      this.menu.close();
    });
  }

  goToDashboard() {
    this.accountNav.setRoot(Dashboard).then(() => {
      this.menu.close();
    });
  }

  logOut() {
    this.accountNav.setRoot(Login, null, { animate: true }).then(() => {
      this.menu.close();
    });
  }

  goBack() {
    this.app.navPop();
  }
}


@Component({
  template: `
    <ion-header>
      <ion-navbar primary>
        <button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Account Dashboard</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <p><button (click)="goToProfile()">Profile</button></p>
      <p><button (click)="logOut()">Logout</button></p>
      <p><button (click)="goBack()">App goBack()</button></p>
    </ion-content>
  `
})
export class Dashboard {
  constructor(private nav: NavController, private app: App) {}

  goToProfile() {
    this.nav.push(Profile);
  }

  logOut() {
    this.nav.parent.setRoot(Login, null, {
      animate: true,
      direction: 'back'
    });
  }

  goBack() {
    this.app.navPop();
  }
}


@Component({
  template: `
    <ion-header>
      <ion-navbar danger>
        <button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Account Profile</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <p><button (click)="goToDashboard()">Dashboard</button></p>
      <p><button (click)="logOut()">Logout</button></p>
      <p><button (click)="goBack()">App goBack()</button></p>
    </ion-content>
  `
})
export class Profile {
  constructor(private nav: NavController, private app: App) {}

  goToDashboard() {
    this.nav.push(Dashboard);
  }

  logOut() {
    this.nav.parent.setRoot(Login, null, {
      animate: true,
      direction: 'back'
    });
  }

  goBack() {
    this.app.navPop();
  }
}


@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>`
})
export class E2EApp {
  rootPage = Login;
}

@NgModule({
  declarations: [
    E2EApp,
    Login,
    Account,
    Dashboard,
    Profile
  ],
  imports: [
    IonicModule.forRoot(E2EApp)
  ],
  bootstrap: [E2EApp],
  entryComponents: [
    Login,
    Account,
    Dashboard,
    Profile
  ]
})
export class AppModule {}
