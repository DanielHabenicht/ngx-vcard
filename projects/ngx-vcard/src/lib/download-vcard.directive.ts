import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { VCardFormatter } from './ngx-vcard.formatter';
import { VCard } from './types/vCard';

@Directive({
  selector: '[vcdDownloadVCard]'
})
export class DownloadVCardDirective {
  constructor(private element: ElementRef) {}
  @Input('vcdDownloadVCard') vCard: VCard;

  @HostListener('click')
  onclick() {
    this.download();
  }

  private download() {
    const blob = VCardFormatter.getVCardAsBlob(this.vCard);
    const a = document.createElement('a');
    const url = URL.createObjectURL(blob);
    (a as any).style = 'display: none';
    document.body.appendChild(a);
    a.href = url;
    a.download = this.vCard.name.firstNames + ' ' + this.vCard.name.lastNames + '.vcf';
    a.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true, view: window }));
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
