import { VCard, Address } from './types/vCard';

export class VCardFormatter {
  public static getVCardAsBlob(vCard: VCard): Blob {
    const data = VCardFormatter.getVCardAsString(vCard);
    return new Blob([data], { type: 'text/xml' });
  }

  /**
   * Get formatted vCard in VCF format
   */
  public static getVCardAsString(vCard: VCard): string {
    if (!vCard.version) {
      vCard.version = '4.0';
    }
    const majorVersion = getMajorVersion(vCard.version);

    let formattedVCardString = '';
    formattedVCardString += 'BEGIN:VCARD' + nl();
    formattedVCardString += 'VERSION:' + vCard.version + nl();

    // const encodingPrefix = +majorVersion >= 4 ? '' : ';CHARSET=UTF-8';
    const encodingPrefix = '';
    let formattedName = '';

    if (vCard.name == null) {
      vCard.name = {};
    }

    formattedVCardString +=
      'N' +
      encodingPrefix +
      ':' +
      [
        e(vCard.name.lastNames),
        e(vCard.name.firstNames),
        e(vCard.name.addtionalNames),
        e(vCard.name.namePrefix),
        e(vCard.name.nameSuffix)
      ].join(';') +
      nl();

    let nameArray = [];
    if (vCard.formattedName != null) {
      nameArray = [vCard.formattedName.firstNames, vCard.formattedName.addtionalNames, vCard.formattedName.lastNames];
    } else {
      nameArray = [vCard.name.firstNames, vCard.name.addtionalNames, vCard.name.lastNames];
    }

    formattedName = nameArray.filter(string => string != null).join(' ');

    formattedVCardString += 'FN' + encodingPrefix + ':' + e(formattedName) + nl();

    if (vCard.nickname && majorVersion >= 3) {
      formattedVCardString += 'NICKNAME' + encodingPrefix + ':' + e(vCard.nickname) + nl();
    }

    if (vCard.gender) {
      if (vCard.gender.sex) {
        formattedVCardString += 'GENDER:' + e(vCard.gender.sex);
        if (vCard.gender.text) {
          formattedVCardString += ';' + e(vCard.gender.text);
        }
        formattedVCardString += nl();
      } else {
        formattedVCardString += 'GENDER:;' + e(vCard.gender.text) + nl();
      }
    }

    if (vCard.uid) {
      formattedVCardString += 'UID' + encodingPrefix + ':' + e(vCard.uid) + nl();
    }

    if (vCard.birthday) {
      formattedVCardString += 'BDAY:' + YYYYMMDD(vCard.birthday) + nl();
    }

    if (vCard.birthday) {
      formattedVCardString += 'ANNIVERSARY:' + YYYYMMDD(vCard.anniversary) + nl();
    }

    if (vCard.email) {
      vCard.email.forEach(function(address) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';type=HOME:' + e(address) + nl();
        } else if (+majorVersion >= 3 && +majorVersion < 4) {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';type=HOME,INTERNET:' + e(address) + nl();
        } else {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';HOME;INTERNET:' + e(address) + nl();
        }
      });
    }

    if (vCard.workEmail) {
      vCard.workEmail.forEach(function(address) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';type=WORK:' + e(address) + nl();
        } else if (+majorVersion >= 3 && +majorVersion < 4) {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';type=WORK,INTERNET:' + e(address) + nl();
        } else {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';WORK;INTERNET:' + e(address) + nl();
        }
      });
    }

    if (vCard.otherEmail) {
      vCard.otherEmail.forEach(function(address) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';type=OTHER:' + e(address) + nl();
        } else if (+majorVersion >= 3 && +majorVersion < 4) {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';type=OTHER,INTERNET:' + e(address) + nl();
        } else {
          formattedVCardString += 'EMAIL' + encodingPrefix + ';OTHER;INTERNET:' + e(address) + nl();
        }
      });
    }

    if (vCard.logo && vCard.logo.url) {
      formattedVCardString += getFormattedPhoto(
        'LOGO',
        vCard.logo.url,
        vCard.logo.mediaType,
        vCard.logo.base64,
        majorVersion
      );
    }

    if (vCard.photo && vCard.photo.url) {
      formattedVCardString += getFormattedPhoto(
        'PHOTO',
        vCard.photo.url,
        vCard.photo.mediaType,
        vCard.photo.base64,
        majorVersion
      );
    }

    if (vCard.cellPhone) {
      vCard.cellPhone.forEach(function(number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="voice,cell":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=CELL:' + e(number) + nl();
        }
      });
    }

    if (vCard.pagerPhone) {
      vCard.pagerPhone.forEach(function(number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="pager,cell":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=PAGER:' + e(number) + nl();
        }
      });
    }

    if (vCard.homePhone) {
      vCard.homePhone.forEach(function(number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="voice,home":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=HOME,VOICE:' + e(number) + nl();
        }
      });
    }

    if (vCard.workPhone) {
      vCard.workPhone.forEach(function(number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="voice,work":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=WORK,VOICE:' + e(number) + nl();
        }
      });
    }

    if (vCard.homeFax) {
      vCard.homeFax.forEach(function(number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="fax,home":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=HOME,FAX:' + e(number) + nl();
        }
      });
    }

    if (vCard.workFax) {
      vCard.workFax.forEach(function(number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="fax,work":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=WORK,FAX:' + e(number) + nl();
        }
      });
    }

    if (vCard.otherPhone) {
      vCard.otherPhone.forEach(function(number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="voice,other":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=OTHER:' + e(number) + nl();
        }
      });
    }
    let addressNotSet = true;
    if (vCard.address) {
      if (hasProp(vCard.address, 'home')) {
        formattedVCardString += getFormattedAddress(
          encodingPrefix,
          {
            details: (vCard.address as { home: Address }).home,
            type: 'HOME'
          },
          majorVersion
        );
        addressNotSet = false;
      }

      if (hasProp(vCard.address, 'work')) {
        formattedVCardString += getFormattedAddress(
          encodingPrefix,
          {
            details: (vCard.address as { work: Address }).work,
            type: 'WORK'
          },
          majorVersion
        );
        addressNotSet = false;
      }

      if (addressNotSet) {
        formattedVCardString += getFormattedAddress(
          encodingPrefix,
          {
            details: (vCard.address as { work: Address }).work,
            type: 'WORK'
          },
          majorVersion
        );
      }
    }

    if (vCard.title) {
      formattedVCardString += 'TITLE' + encodingPrefix + ':' + e(vCard.title) + nl();
    }

    if (vCard.role) {
      formattedVCardString += 'ROLE' + encodingPrefix + ':' + e(vCard.role) + nl();
    }

    if (vCard.organization) {
      formattedVCardString += 'ORG' + encodingPrefix + ':' + e(vCard.organization) + nl();
    }

    if (vCard.url) {
      let urlNotSet = true;
      if (hasProp(vCard.url, 'home')) {
        formattedVCardString += 'URL;type=WORK' + encodingPrefix + ':' + e((vCard.url as { home: string }).home) + nl();
        urlNotSet = false;
      }

      if (hasProp(vCard.url, 'work')) {
        formattedVCardString += 'URL;type=WORK' + encodingPrefix + ':' + e((vCard.url as { work: string }).work) + nl();
        urlNotSet = false;
      }
      if (urlNotSet) {
        formattedVCardString += 'URL' + encodingPrefix + ':' + e(vCard.url as string) + nl();
      }
    }

    if (vCard.note) {
      formattedVCardString += 'NOTE' + encodingPrefix + ':' + e(vCard.note) + nl();
    }

    if (vCard.socialUrls) {
      for (const key in vCard.socialUrls) {
        if (vCard.socialUrls.hasOwnProperty(key) && vCard.socialUrls[key]) {
          formattedVCardString +=
            'X-SOCIALPROFILE' + encodingPrefix + ';TYPE=' + key + ':' + e(vCard.socialUrls[key]) + nl();
        }
      }
    }

    if (vCard.source) {
      formattedVCardString += 'SOURCE' + encodingPrefix + ':' + e(vCard.source) + nl();
    }
    if (vCard.rev) {
      formattedVCardString += 'REV:' + vCard.rev + nl();
    }
    formattedVCardString += 'END:VCARD' + nl();
    return formattedVCardString;
  }
}

/**
 * Encodes string
 */
function e(value: string): string {
  if (value) {
    if (typeof value !== 'string') {
      value = '' + value;
    }
    return value
      .replace(/\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;');
  }
  return '';
}

/**
 * Return new line characters
 */
function nl(): string {
  return '\n';
}

/**
 * Get formatted photo
 * @param photoType       Photo type (PHOTO, LOGO)
 * @param url             URL to attach photo from
 * @param mediaType       Media-type of photo (JPEG, PNG, GIF)
 */
function getFormattedPhoto(
  photoType: 'PHOTO' | 'LOGO',
  url: string,
  mediaType: string,
  base64: boolean,
  majorVersion: number
) {
  let params;

  if (+majorVersion >= 4) {
    params = base64 ? ';ENCODING=b;MEDIATYPE=image/' : ';MEDIATYPE=image/';
  } else if (+majorVersion === 3) {
    params = base64 ? ';ENCODING=b;TYPE=' : ';TYPE=';
  } else {
    params = base64 ? ';ENCODING=BASE64;' : ';';
  }

  const formattedPhoto = photoType + params + mediaType + ':' + e(url) + nl();
  return formattedPhoto;
}

/**
 * Get formatted address
 */
function getFormattedAddress(
  encodingPrefix: string,
  address: { details: Address; type: string },
  majorVersion: number
) {
  let formattedAddress = '';
  if (address.details) {
    if (
      address.details.label ||
      address.details.street ||
      address.details.city ||
      address.details.stateProvince ||
      address.details.postalCode ||
      address.details.countryRegion
    ) {
      if (+majorVersion >= 4) {
        formattedAddress =
          'ADR' +
          encodingPrefix +
          ';TYPE=' +
          address.type +
          (address.details.label ? ';LABEL="' + e(address.details.label) + '"' : '') +
          ':;;' +
          e(address.details.street) +
          ';' +
          e(address.details.city) +
          ';' +
          e(address.details.stateProvince) +
          ';' +
          e(address.details.postalCode) +
          ';' +
          e(address.details.countryRegion) +
          nl();
      } else {
        if (address.details.label) {
          formattedAddress = 'LABEL' + encodingPrefix + ';TYPE=' + address.type + ':' + e(address.details.label) + nl();
        }
        formattedAddress +=
          'ADR' +
          encodingPrefix +
          ';TYPE=' +
          address.type +
          ':;;' +
          e(address.details.street) +
          ';' +
          e(address.details.city) +
          ';' +
          e(address.details.stateProvince) +
          ';' +
          e(address.details.postalCode) +
          ';' +
          e(address.details.countryRegion) +
          nl();
      }
    }
  }

  return formattedAddress;
}

/**
 * Convert date to YYYYMMDD format
 */
function YYYYMMDD(date: Date): string {
  return date.toLocaleDateString('se').replace(/\D/g, ''); // use Swedish date format
}

/**
 * Get major version from version string
 */
export function getMajorVersion(version: string): number {
  const majorVersionString = version ? version.slice(0, 1) : '4';
  if (!isNaN(+majorVersionString)) {
    return Number.parseInt(majorVersionString);
  }
  return 4;
}

/**
 * Determines if the object has the Property
 * @param obj Object to test
 * @param property Property to check
 */
function hasProp(obj: any, property: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
