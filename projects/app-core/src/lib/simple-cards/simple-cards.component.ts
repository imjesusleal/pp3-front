import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'lib-simple-cards',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './simple-cards.component.html',
  styleUrl: './simple-cards.component.css'
})
export class SimpleCardsComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() content!: string;
}
