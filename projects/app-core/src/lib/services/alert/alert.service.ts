import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { from, Observable, switchMap } from 'rxjs';
import { AlertModel, defaultBtns } from '../../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  async alert(model: AlertModel) {
    const buttons = model.buttons ?? defaultBtns;
    const header = model.header ?? "Ups, algo ha salido mal";

    const dialog = await this.alertCtrl.create({
      header: header,
      message: model.message,
      buttons: buttons
    });

    return dialog.present();
  }

  alert$(model: AlertModel): Observable<any> {
    const buttons = model.buttons ?? defaultBtns;
    const header = model.header ?? "Ups, algo ha salido mal";

    const dialog$ = from(this.alertCtrl.create({
      header: header,
      message: model.message,
      buttons: buttons
    }));

    return dialog$.pipe(switchMap(dialog => from(dialog.present()).pipe(switchMap(() => dialog.onDidDismiss()))));
  }
}
