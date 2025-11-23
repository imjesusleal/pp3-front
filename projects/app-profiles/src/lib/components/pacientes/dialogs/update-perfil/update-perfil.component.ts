import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'lib-update-perfil',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './update-perfil.component.html',
  styleUrl: './update-perfil.component.css'
})
export class UpdatePerfilComponent {
  constructor(private modalCtrl: ModalController) {
    
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    //update del perfil
    return this.modalCtrl.dismiss(null,'confirm');
  }
}
