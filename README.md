[![npm version](https://badge.fury.io/js/ngx-vcard.svg)](https://badge.fury.io/js/ngx-vcard)
[![Build Status](https://dev.azure.com/DanielHabenicht/ngx-vcard/_apis/build/status/DanielHabenicht.ngx-vcard?branchName=master)](https://dev.azure.com/DanielHabenicht/ngx-vcard/_build/latest?definitionId=2&branchName=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![codecov](https://codecov.io/gh/DanielHabenicht/ngx-vcard/branch/master/graph/badge.svg)](https://codecov.io/gh/DanielHabenicht/ngx-vcard)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDanielHabenicht%2Fngx-vcard.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FDanielHabenicht%2Fngx-vcard?ref=badge_shield)

# ngx-vcard

Almost fully [RFC](https://tools.ietf.org/html/rfc6350) compliant vCard
Formatter, that also can download the generated vCard. Outputs VCard version 4.
Maybe other version will be supported.

If you want to have another Property, please open up an issue or even better
provide a PR. ;)

## Installation

1.  Install from npm
    ```bash
    $ npm install ngx-vcard --save
    ```
2.  Import in app.module.ts:

    ```typescript
    import { NgxVcardModule } from "ngx-vcard";

    @NgModule({
      imports: [NgxVcardModule],
    })
    export class AppModule {}
    ```

## How to use

### Use as Directive

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/DanielHabenicht/ngx-vcard?template=node&title=ngx-vcard%20Example)

```typescript
/* example.component.ts */
import { Component } from "@angular/core";
import { VCard } from "ngx-vcard";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public vCard: VCard = {
    name: {
      firstNames: "John",
      lastNames: "Doe",
    },
  };
  public generateVCardOnTheFly = (): VCard => {
    // TODO: Generate the VCard before Download
    return {
      name: { firstNames: "John", lastNames: "Doe", addtionalNames: "Auto" },
    };
  };
}
```

```html
<!-- example.component.html -->
<div>
  <!-- Normal -->
  <button id="downloadButtonNormal" [vcdDownloadVCard]="vCard">Download VCard!</button>
  <!-- Generate VCard only on Click -->
  <button id="downloadButtonFunction" vcdDownloadVCard [generateVCardFunction]="generateVCardOnTheFly">Download generated VCard!</button>
</div>
```

### Use as Formatter

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/DanielHabenicht/ngx-vcard?template=node&title=ngx-vcard%20Example)

```typescript
/* example.component.ts */
import { Component } from "@angular/core";
import { VCardFormatter, VCard } from "ngx-vcard";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public vCard: VCard = {
    name: {
      firstNames: "John",
      lastNames: "Doe",
    },
  };

  public vCardString = VCardFormatter.getVCardAsString(this.vCard);

  public ngOnInit() {
    console.log(this.vCardString);
  }
}
```

```html
<!-- example.component.html -->
<p>VCard String:</p>
<p>{{vCardString}}</p>
```

## Mentions

This project is heavily inspired from the
[vCards-js](https://github.com/enesser/vCards-js) Package from Eric J Nesser.

## RFC

- VCard Version 4 - https://tools.ietf.org/html/rfc6350
- VCard Version 3 - https://www.ietf.org/rfc/rfc2426.txt A Story about
  everything:
  https://alessandrorossini.org/the-sad-story-of-the-vcard-format-and-its-lack-of-interoperability/

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDanielHabenicht%2Fngx-vcard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FDanielHabenicht%2Fngx-vcard?ref=badge_large)

# New Version

dropped IE11 support
