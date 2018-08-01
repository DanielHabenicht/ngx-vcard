[![npm version](https://badge.fury.io/js/ngx-vcard.svg)](https://badge.fury.io/js/ngx-vcard)
[![Build Status](https://travis-ci.org/DanielHabenicht/ngx-vcard.svg?branch=master)](https://travis-ci.org/DanielHabenicht/ngx-vcard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Greenkeeper badge](https://badges.greenkeeper.io/DanielHabenicht/ngx-propagation-stop.svg)](https://greenkeeper.io/)

# ngx-vcard

Almost fully RFC compliant vCard Formatter, that also can download the generated vCard.
Outputs VCard version 4.
Maybe other version will be supported.

If you want to have another Property, please open up an issue or even better provide a PR. ;)

## Installation

1.  Install from npm
    ```bash
    $ npm install ngx-vcard --save
    ```
2.  Import in app.module.ts:

    ```typescript
    import { NgxVcardModule } from "ngx-vcard";

    @NgModule({
      imports: [NgxVcardModule]
    })
    export class AppModule {}
    ```

## How to use

- TODO: Add .ts File example
- TODO: Add directive example

## Mentions

This project is based on the [vCards-js](https://github.com/enesser/vCards-js) Package from Eric J Nesser.
