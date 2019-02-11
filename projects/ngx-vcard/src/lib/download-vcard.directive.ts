import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { VCardFormatter } from './ngx-vcard.formatter';
import { VCard } from './types/vCard';
import { VCardEncoding } from './types/vCardEncoding';

@Directive({
  selector: '[vcdDownloadVCard]'
})
export class DownloadVCardDirective {
  constructor(private element: ElementRef) {}
  @Input('vcdDownloadVCard')
  vCard!: VCard;
  @Input() public encoding: VCardEncoding = VCardEncoding.none;

  @HostListener('click')
  onclick() {
    const blob = VCardFormatter.getVCardAsBlob(this.vCard, this.encoding);
    let filename = 'vCard';
    if (this.vCard.name != null) {
      filename = this.vCard.name.firstNames + ' ' + this.vCard.name.lastNames + '.vcf';
    }
    this.download(blob, filename);
  }

  private download(data: Blob, filename: string) {
    // IE 11
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(data, filename);
    } else {
      const a: HTMLAnchorElement = document.createElement('a');
      const url = URL.createObjectURL(data);
      (a as any).style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }
}
