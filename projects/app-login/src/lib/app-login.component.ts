import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'lib-app-login',
  standalone: true,
  imports: [RouterOutlet, IonicModule],
  host: { '[attr.ngSkipHydration]': 'true' },
  template: `
    <ion-content class="ion-padding">
      <router-outlet></router-outlet>
    </ion-content>
  `,
  styles: ``
})
export class AppLoginComponent {
}
