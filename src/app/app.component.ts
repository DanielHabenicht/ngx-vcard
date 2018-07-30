import { Component } from '@angular/core';
import { VCard } from 'ngx-vcard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public vCard: VCard = { name: { firstNames: 'John', lastNames: 'Doe' } };
}
