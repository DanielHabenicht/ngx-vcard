import { e } from '../../ngx-vcard.formatter';
import { Address } from '../vCard';

/**
 * A property can have attributes associated with it.
 * These "property parameters" contain meta-information about the property or the property value.
 * @link https://tools.ietf.org/html/rfc6350#section-5
 */
export interface BasicPropertyParameters {
  /**
   * The LANGUAGE property parameter is used to identify data in multiple languages.
   * @kind Property: LANGUAGE
   * @link https://tools.ietf.org/html/rfc6350#section-5.1
   *
   */
  language?: string;
  /**
   * The VALUE parameter is OPTIONAL, used to identify the value type (data type) and format of the value.
   * @kind Property: VALUE
   * @link https://tools.ietf.org/html/rfc6350#section-5.2
   */
  value?:
    | 'text'
    | 'uri'
    | 'date'
    | 'time'
    | 'date-time'
    | 'date-and-or-time'
    | 'timestamp'
    | 'boolean'
    | 'integer'
    | 'float'
    | 'utc-offset'
    | 'language-tag';
  /**
   * The PREF parameter is OPTIONAL and is used to indicate that the corresponding instance of a property is preferred by the vCard author.
   * Its value MUST be an integer between 1 and 100 that quantifies the level of preference.
   * Lower values correspond to a higher level of preference, with 1 being most preferred.
   * @kind Property: PREF
   * @link https://tools.ietf.org/html/rfc6350#section-5.3
   */
  pref?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43
    | 44
    | 45
    | 46
    | 47
    | 48
    | 49
    | 50
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 60
    | 61
    | 62
    | 63
    | 64
    | 65
    | 66
    | 67
    | 68
    | 69
    | 70
    | 71
    | 72
    | 73
    | 74
    | 75
    | 76
    | 77
    | 78
    | 79
    | 80
    | 81
    | 82
    | 83
    | 84
    | 85
    | 86
    | 87
    | 88
    | 89
    | 90
    | 91
    | 92
    | 93
    | 94
    | 95
    | 96
    | 97
    | 98
    | 99
    | 100;
  /**
   * The ALTID parameter is used to "tag" property instances as being alternative representations of the same logical property.
   * For example, translations of a property in multiple languages generates multiple property instances
   * having different LANGUAGE parameter that are tagged with the same ALTID value.
   * @kind Property: ALTID
   * @link https://tools.ietf.org/html/rfc6350#section-5.4
   */
  altid?: string;
  /**
   * The PID parameter is used to identify a specific property among multiple instances.
   * @kind Property: PID
   * @link https://tools.ietf.org/html/rfc6350#section-5.5
   */
  pid?: string[];
  /**
   * The TYPE parameter has multiple, different uses.
   * In general, it is a way of specifying class characteristics of the associated property.
   * @kind Property: TYPE
   * @link https://tools.ietf.org/html/rfc6350#section-5.6
   */
  type?:
    | Array<'work' | 'home' | 'text' | 'voice' | 'fax' | 'cell' | 'video' | 'pager' | 'textphone'>
    | 'work'
    | 'home'
    | 'text'
    | 'voice'
    | 'fax'
    | 'cell'
    | 'video'
    | 'pager'
    | 'textphone';
  /**
   * The MEDIATYPE parameter is used with properties whose value is a URI.
   * @kind Property: MEDIATYPE
   * @link https://tools.ietf.org/html/rfc6350#section-5.7
   */
  mediatype?: string;
  /**
   * The CALSCALE parameter is used to define the calendar system in which a date or date-time value is expressed.
   * @kind Property: CALSCALE
   * @link https://tools.ietf.org/html/rfc6350#section-5.8
   */
  calscale?: 'gregorian';
  /**
   * The "sort-as" parameter is used to specify the string to be used for national-language-specific sorting.
   * Without this information, sorting algorithms could incorrectly sort this vCard within a sequence of sorted vCards.
   * @kind Property: SORT-AS
   * @link https://tools.ietf.org/html/rfc6350#section-5.9
   */
  sortas?: string[];
  /**
   * The GEO parameter can be used to indicate global positioning information that is specific to an address.
   * @kind Property: GEO
   * @link https://tools.ietf.org/html/rfc6350#section-5.10
   */
  geo?: string;
  /**
   * The TZ parameter can be used to indicate time zone information that is specific to an address.
   * @kind Property: TZ
   * @link https://tools.ietf.org/html/rfc6350#section-5.11
   */
  timezone?: string;
}

export function propertyToVCardString(property: BasicPropertyParameters): string {
  let str = '';
  if (property.language) {
    str += ';LANGUAGE=' + e(property.language);
  }
  if (property.value) {
    str += ';VALUE=' + e(property.value);
  }
  if (property.altid) {
    str += ';ALTID=' + e(property.altid);
  }
  if (property.pid) {
    str += ';PID=' + property.pid.map(s => e(s)).join(',');
  }
  if (property.type) {
    if (Array.isArray(property.type)) {
      if (property.type.length === 1) {
        str += ';TYPE=' + property.type[0];
      } else {
        str += ';TYPE="' + property.type.map(s => s.toLowerCase()).join(',') + '"';
      }
    } else {
      str += ';TYPE=' + property.type;
    }
  }
  if (property.mediatype) {
    str += ';MEDIATYPE=' + e(property.mediatype);
  }
  if (property.pref) {
    str += ';PREF=' + property.pref;
  }
  if (property.calscale) {
    str += ';CALSCALE=' + e(property.calscale);
  }
  if (property.sortas) {
    str += ';SORT-AS="' + property.sortas.map(s => e(s)).join(',') + '"';
  }
  if (property.geo) {
    str += ';GEO=' + e(property.geo);
  }
  if (property.timezone) {
    str += ';TZ=' + e(property.timezone);
  }

  return str;
}

export function isPropertyWithParameters(object: any): object is { value?: string; param?: BasicPropertyParameters } {
  const test = <{ value?: string; param?: BasicPropertyParameters }>object;
  if (test == null || test.param == null || test.value == null) {
    return false;
  }
  return (
    test.param.language !== undefined ||
    test.param.value !== undefined ||
    test.param.pref !== undefined ||
    test.param.altid !== undefined ||
    test.param.pid !== undefined ||
    test.param.type !== undefined ||
    test.param.mediatype !== undefined ||
    test.param.calscale !== undefined ||
    test.param.sortas !== undefined ||
    test.param.geo !== undefined ||
    test.param.timezone !== undefined
  );
}

export function isPropertyWithParametersAddressValue(
  object: any
): object is { value?: Address; param?: BasicPropertyParameters } {
  const test = <{ value?: Address; param?: BasicPropertyParameters }>object;
  if (test == null || test.param == null || test.value == null) {
    return false;
  }
  return (
    test.param.language !== undefined ||
    test.param.value !== undefined ||
    test.param.pref !== undefined ||
    test.param.altid !== undefined ||
    test.param.pid !== undefined ||
    test.param.type !== undefined ||
    test.param.mediatype !== undefined ||
    test.param.calscale !== undefined ||
    test.param.sortas !== undefined ||
    test.param.geo !== undefined ||
    test.param.timezone !== undefined
  );
}
