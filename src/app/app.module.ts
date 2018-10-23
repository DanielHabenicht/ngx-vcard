import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// ATTENTION: This is for development only!
// For production / use as package use this line:
// import { NgxVcardModule } from 'ngx-vcard';
import { NgxVcardModule } from 'projects/ngx-vcard/src/lib/ngx-vcard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxVcardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
