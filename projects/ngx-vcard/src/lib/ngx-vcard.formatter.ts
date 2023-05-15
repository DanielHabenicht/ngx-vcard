import { VCard, Address } from './types/vCard';
import { VCardEncoding } from './types/vCardEncoding';
import {
  isPropertyWithParameters,
  propertyToVCardString,
  BasicPropertyParameters,
  isPropertyWithParametersAddressValue,
} from './types/parameter/BasicPropertyParameters.type';
import { nl, e } from './helpers';

export class VCardFormatter {
  public static getVCardAsBlob(vCard: VCard, encoding: VCardEncoding = VCardEncoding.none): Blob {
    const data = VCardFormatter.getVCardAsString(vCard, encoding);
    // This code will enforce compatibility with ANSI encoding for outlook
    let uint8 = new Uint8Array(data.length);
    for (let i = 0; i < uint8.length; i++) {
      uint8[i] = data.charCodeAt(i);
    }

    return new Blob([uint8], { type: 'text/vcard' });
  }

  /**
   * Get formatted vCard in VCF format
   */
  public static getVCardAsString(vCard: VCard, encodingPrefix: VCardEncoding = VCardEncoding.none): string {
    if (!vCard.version) {
      vCard.version = '4.0';
    }
    const majorVersion = getMajorVersion(vCard.version);

    let formattedVCardString = '';
    formattedVCardString += 'BEGIN:VCARD' + nl();
    formattedVCardString += 'VERSION:' + vCard.version + nl();

    // const encodingPrefix = '';
    let formattedName = '';
    if (vCard.name == null) {
      vCard.name = {};
    }

    let nameArray = [];
    if (vCard.formattedName != null) {
      nameArray = [vCard.formattedName.firstNames, vCard.formattedName.addtionalNames, vCard.formattedName.lastNames];
    } else {
      nameArray = [vCard.name.firstNames, vCard.name.addtionalNames, vCard.name.lastNames];
    }

    formattedName = nameArray.filter((string) => string != null).join(' ');

    formattedVCardString += 'FN' + encodingPrefix + ':' + e(formattedName) + nl();

    formattedVCardString +=
      'N' +
      encodingPrefix +
      ':' +
      [
        e(vCard.name.lastNames),
        e(vCard.name.firstNames),
        e(vCard.name.addtionalNames),
        e(vCard.name.namePrefix),
        e(vCard.name.nameSuffix),
      ].join(';') +
      nl();

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

    if (vCard.anniversary) {
      formattedVCardString += 'ANNIVERSARY:' + YYYYMMDD(vCard.anniversary) + nl();
    }

    if (vCard.language) {
      vCard.language.forEach((language) => {
        if (isPropertyWithParameters(language)) {
          formattedVCardString += 'LANG' + propertyToVCardString(language.param) + ':' + e(language.value) + nl();
        } else {
          formattedVCardString += 'LANG:' + e(language) + nl();
        }
      });
    }

    if (vCard.organization) {
      if (isPropertyWithParameters(vCard.organization)) {
        formattedVCardString +=
          'ORG' + propertyToVCardString(vCard.organization.param) + ':' + e(vCard.organization.value) + nl();
      } else {
        formattedVCardString += 'ORG' + encodingPrefix + ':' + e(vCard.organization) + nl();
      }
    }

    if (vCard.address) {
      vCard.address.forEach((address) => {
        if (isPropertyWithParametersAddressValue(address)) {
          formattedVCardString +=
            'ADR' +
            propertyToVCardString(address.param as BasicPropertyParameters) +
            getFormattedAddress(address.value) +
            nl();
        } else {
          formattedVCardString += 'ADR' + getFormattedAddress(address) + nl();
        }
      });
    }

    if (vCard.telephone) {
      vCard.telephone.forEach((element) => {
        if (!isPropertyWithParameters(element)) {
          element = {
            value: element,
            param: {
              type: 'voice',
            },
          };
        }
        formattedVCardString +=
          'TEL' + propertyToVCardString(element.param as BasicPropertyParameters) + ':' + e(element.value) + nl();
      });
    }

    if (vCard.email) {
      vCard.email.forEach((email) => {
        if (isPropertyWithParameters(email)) {
          formattedVCardString += 'EMAIL' + propertyToVCardString(email.param) + ':' + e(email.value) + nl();
        } else {
          formattedVCardString += 'EMAIL:' + e(email) + nl();
        }
      });
    }

    if (vCard.title) {
      formattedVCardString += 'TITLE' + encodingPrefix + ':' + e(vCard.title) + nl();
    }

    if (vCard.logo) {
      if (isPropertyWithParameters(vCard.logo)) {
        formattedVCardString += 'LOGO' + propertyToVCardString(vCard.logo.param) + ':' + e(vCard.logo.value) + nl();
      } else {
        formattedVCardString += 'LOGO:' + e(vCard.logo) + nl();
      }
    }

    if (vCard.photo) {
      if (isPropertyWithParameters(vCard.photo)) {
        formattedVCardString += 'PHOTO' + propertyToVCardString(vCard.photo.param) + ':' + e(vCard.photo.value) + nl();
      } else {
        formattedVCardString += 'PHOTO:' + e(vCard.photo) + nl();
      }
    }

    if (vCard.homeFax) {
      vCard.homeFax.forEach(function (number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="fax,home":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=HOME,FAX:' + e(number) + nl();
        }
      });
    }

    if (vCard.workFax) {
      vCard.workFax.forEach(function (number) {
        if (+majorVersion >= 4) {
          formattedVCardString += 'TEL;VALUE=uri;TYPE="fax,work":tel:' + e(number) + nl();
        } else {
          formattedVCardString += 'TEL;TYPE=WORK,FAX:' + e(number) + nl();
        }
      });
    }

    if (vCard.role) {
      formattedVCardString += 'ROLE' + encodingPrefix + ':' + e(vCard.role) + nl();
    }

    if (vCard.url) {
      let urlNotSet = true;
      if (hasProp(vCard.url, 'home')) {
        formattedVCardString += 'URL;type=HOME' + encodingPrefix + ':' + e((vCard.url as { home: string }).home) + nl();
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
      if (isPropertyWithParameters(vCard.source)) {
        formattedVCardString +=
          'SOURCE' + encodingPrefix + propertyToVCardString(vCard.source.param) + ':' + e(vCard.source.value) + +nl();
      } else {
        formattedVCardString += 'SOURCE' + encodingPrefix + ':' + e(vCard.source) + nl();
      }
    }
    if (vCard.rev) {
      formattedVCardString += 'REV:' + vCard.rev + nl();
    }
    formattedVCardString += 'END:VCARD' + nl();
    return formattedVCardString;
  }
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
function getFormattedAddress(address: Address) {
  return (
    (address.label ? ';LABEL="' + e(address.label) + '"' : '') +
    ':' +
    e(address.postOfficeBox) +
    ';' +
    e(address.extendedAddress) +
    ';' +
    e(address.street) +
    ';' +
    e(address.locality) +
    ';' +
    e(address.region) +
    ';' +
    e(address.postalCode) +
    ';' +
    e(address.countryName)
  );
}

/**
 * Convert date to YYYYMMDD format
 */
function YYYYMMDD(date: Date | undefined): string {
  if (!date) {
    return '';
  }
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
