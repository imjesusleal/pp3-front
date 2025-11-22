import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertModel, defaultBtns } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertCtrl: AlertController) { }

  async alert(model: AlertModel) {
    const buttons = model.buttons ?? defaultBtns;

    const dialog = await this.alertCtrl.create({
      header: model.header,
      message: model.message,
      buttons: buttons
    });

    return dialog.present();
  }
}
