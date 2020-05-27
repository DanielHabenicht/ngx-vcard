import { Component } from '@angular/core';
import { VCard } from 'ngx-vcard';
import { VCardEncoding } from 'ngx-vcard';
import { VCardFormatter } from 'ngx-vcard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public vCardEncoding: typeof VCardEncoding = VCardEncoding;
  public vCard: VCard = { name: { firstNames: 'John', lastNames: 'Doe' } };
  public vCardString = VCardFormatter.getVCardAsString(this.vCard)
}
