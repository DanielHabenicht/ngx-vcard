import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// For easier development you can use this line:
// import { NgxVcardModule } from 'projects/ngx-vcard/src/lib/ngx-vcard.module';
import { NgxVcardModule } from 'ngx-vcard';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxVcardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
