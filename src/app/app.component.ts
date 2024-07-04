import { Component } from '@angular/core';
// For easier development you can use this line:
import {
  VCard,
  VCardEncoding,
  VCardFormatter,
} from 'projects/ngx-vcard/src/public_api';
// import { VCard, VCardEncoding, VCardFormatter } from 'ngx-vcard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public vCardEncoding: typeof VCardEncoding = VCardEncoding;
  public vCard: VCard = { name: { firstNames: 'John', lastNames: 'Doe' } };
  public vCardString = VCardFormatter.getVCardAsString(this.vCard);
  public generateVCardOnTheFly = (): VCard => {
    return {
      name: { firstNames: 'John', lastNames: 'Doe', addtionalNames: 'Auto' },
    };
  };
}
