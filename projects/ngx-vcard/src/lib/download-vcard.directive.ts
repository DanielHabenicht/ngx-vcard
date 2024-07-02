import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { VCardFormatter } from './ngx-vcard.formatter';
import { VCard } from './types/vCard';
import { VCardEncoding } from './types/vCardEncoding';

const ERROR_MESSAGE =
  "ngx-vcard: No input specified. You must specify either 'vcdDownloadVCard' or 'generateVCardFunction'";

// TODO: Remove @Directive
@Directive({
  selector: '[vcdDownloadVCard]',
})
export class DownloadVCardDirective {
  constructor(private element: ElementRef) {}
  // This property is always specified as it is the selector,
  // which means it can't be undefined
  @Input('vcdDownloadVCard')
  vCard!: VCard | '';
  @Input('generateVCardFunction')
  generateVCardFunction: (() => VCard) | '' | undefined;
  @Input() public encoding: VCardEncoding = VCardEncoding.none;

  @HostListener('click')
  onclick() {
    if (this.vCard == '') {
      if (
        this.generateVCardFunction != undefined &&
        this.generateVCardFunction != ''
      ) {
        this.vCard = this.generateVCardFunction();
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    }
    const blob = VCardFormatter.getVCardAsBlob(this.vCard, this.encoding);
    let filename = 'vCard';
    if (this.vCard.name != null) {
      filename =
        this.vCard.name.firstNames + ' ' + this.vCard.name.lastNames + '.vcf';
    }
    this.download(blob, filename);
  }

  private download(data: Blob, filename: string) {
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

  ngOnInit() {
    if (
      this.vCard == '' &&
      (this.generateVCardFunction == '' ||
        this.generateVCardFunction == undefined)
    ) {
      throw new Error(ERROR_MESSAGE);
    }
  }
}
