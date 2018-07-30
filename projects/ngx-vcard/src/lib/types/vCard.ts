/**
 * vCard interface with properties for the vCard format, which allows the capture and exchange of
   information normally stored within an address book or directory application.
 * Explanations from [RFC 6350](https://tools.ietf.org/html/rfc6350)
 * Does not support xml Encapsulation.
 */
export interface VCard {
  /***********************************************************************************************
   * General Property
   ***********************************************************************************************/

  /**
   * The source of directory information contained in the content type.
   * @kind SOURCE
   */
  source?: string;
  /**
   * The kind of object the vCard represents.
   * @kind KIND
   */
  kind?: 'individual' | 'group' | 'org' | 'location';
  /**
   * Include extended XML-encoded vCard data in a plain vCard.
   * @kind XML
   * @link https://tools.ietf.org/html/rfc6350#section-6.1.5
   */
  xml?: string;

  /***********************************************************************************************
   * Identification Properties
   ***********************************************************************************************/

  /**
   * The formatted text corresponding to the name of the object the vCard represents.
   * (will automatically populatet if not set)
   * @kind FN
   */
  // formattedName?: Name | { work?: Name, home?: Name };
  formattedName?: Name;

  /**
   * The name of the object the vCard represents.
   * @kind N
   */
  name?: Name;
  /**
   * The text corresponding to the nickname of the object the vCard represents.
   * @kind NICKNAME
   */
  // nickname?: string | { work?: string, home?: string };
  nickname?: string;

  /**
   * An image or photograph information that annotates some aspect of the object the vCard represents.
   * @kind PHOTO
   */
  // photo?: Image | { work?: Image, home?: Image };
  photo?: Image;

  /**
   * The birth date of the object the vCard represents.
   * @kind BDAY
   */
  birthday?: Date;
  /**
   * Date of marriage, or equivalent, of the object the vCard represents.
   * @kind ANNIVERSARY
   */
  anniversary?: Date;
  /**
   * The components of the sex and gender identity of the object the vCard represents.
   * @kind GENDER
   */
  gender?: Gender;

  /***********************************************************************************************
   * Delivery Addressing Properties
   ***********************************************************************************************/

  /**
   * The components of the delivery address for the vCard object.
   * @kind ADR
   */
  address?: Address | { work?: Address; home?: Address };

  /***********************************************************************************************
   * Communications Properties
   ***********************************************************************************************/

  /**
   * The telephone number for telephony communication with the object the vCard represents.
   * @kind TEL
   * TODO: Still to specify
   */
  telephone?: string;

  /**
   * Cell phone number
   */
  cellPhone?: string[];
  /**
   * pager phone number
   */
  pagerPhone?: string[];
  /**
   * other phone number
   */
  otherPhone?: string[];
  /**
   * Work phone
   */
  workPhone?: string[];
  /**
   * Work facsimile
   */
  workFax?: string[];
  /**
   * Home phone
   */
  homePhone?: string[];
  /**
   * Home facsimile
   */
  homeFax?: string[];

  /**
   * The electronic mail address for communication with the object the vCard represents.
   * @kind EMAIL
   */
  email?: string[];
  //  email?: string[] | {work: string, home: string}[];

  /**
   * The address for work-related electronic mail communication
   * @deprecated
   */
  workEmail?: string[];
  /**
   * The address for other electronic mail communication
   * @deprecated
   */
  otherEmail?: string[];
  /**
   * The URI for instant messaging and presence protocol communications with the object the vCard represents.
   * @kind IMPP
   */
  instantMessagingPresenceProtocol?: string;
  /**
   * The language(s) that may be used for contacting the entity associated with the vCard.
   * @kind LANG
   */
  language?: string[];

  /***********************************************************************************************
   * Geographical Properties
   ***********************************************************************************************/

  /**
   * Information related to the time zone of the object the vCard represents.
   * @kind TZ
   */
  timezone?: string;

  /**
   * Information related to the global positioning of the object the vCard represents.
   * @kind GEO
   */
  geoPosition?: string;

  /***********************************************************************************************
   * Organizational Properties
   ***********************************************************************************************/

  /**
   * The position or job of the object the vCard represents.
   * @kind TITLE
   */
  title?: string;
  /**
   * The function or part played in a particular situation by the object the vCard represents.
   * @kind ROLE
   */
  role?: string;
  /**
   * A graphic image of a logo associated with the object the vCard represents.
   * @kind LOGO
   */
  logo?: Image;
  /**
   * The organizational name and units associated with the vCard.
   * @kind ORG
   */
  organization?: string;
  /**
   * A member in the group this vCard represents.
   * @kind MEMBER
   */
  member?: string;
  /**
   * A relationship between another entity and the entity represented by this vCard.
   * @kind RELATED
   */
  related?: string;

  /***********************************************************************************************
   * Explanatory Properties
   ***********************************************************************************************/

  /**
   * Application category information about the vCard, also known as "tags".
   * @kind CATEGORIES
   */
  categories?: string[];
  /**
   * Supplemental information or a comment that is associated with the vCard.
   * @kind NOTE
   */
  note?: string;
  /**
   * The identifier for the product that created the vCard object.
   * @kind PRODID
   */
  prodid?: string;
  /**
   * Revision information about the current vCard.
   * @kind REV
   */
  rev?: string;
  /**
   * A digital sound content information that annotates some aspect of the vCard.
   * This property is often used to specify the proper pronunciation of the name property value of the vCard.
   * @kind SOUND
   */
  sound?: string;
  /**
   * A value that represents a globally unique identifier corresponding to the entity associated with the vCard.
   * @kind UID
   */
  uid?: string;
  /**
   * To give a global meaning to a local PID source identifier.
   * @kind CLIENTPIDMAP
   */
  clientpidmap?: string;
  /**
   * A uniform resource locator associated with the object to which the vCard refers.
   * Examples for individuals include personal web sites, blogs, and social networking site identifiers.
   * @kind URL
   */
  url?: string | { work: string; home: string };
  /**
   * The version of the vCard specification used to format this vCard.
   * @kind VERSION
   */
  version?: string;

  /***********************************************************************************************
   * Security Properties
   ***********************************************************************************************/

  /**
   * A public key or authentication certificate associated with the object that the vCard represents.
   * @kind KEY
   */
  key?: string;

  /***********************************************************************************************
   * Calendar Properties
   ***********************************************************************************************/
  /**
   * The URI for the busy time associated with the object that the vCard represents.
   * @kind FBURL
   */
  fburl?: string;

  /**
   * The calendar user address to which a scheduling request should be sent for the object represented by the vCard.
   * @kind CALADRURI
   */
  caladURI?: string;

  /**
   * The URI for a calendar associated with the object represented by the vCard.
   * @kind CALURI
   */
  calenderURI?: string;

  socialUrls?: any;
}

export interface Image {
  url: string;
  mediaType: string;
  base64: boolean;
  attachFromUrl: Function;
  embedFromString: Function;
}

export interface Address {
  /**
   * Represents the actual text that should be put on the mailing label when delivering a physical package
   */
  label: string;

  /**
   * Street address
   */
  street: string;

  /**
   * City
   */
  city: string;

  /**
   * State or province
   */
  stateProvince: string;

  /**
   * Postal code
   */
  postalCode: string;

  /**
   * Country or region
   */
  countryRegion: string;
}

export interface Name {
  /**
   * Family Names (Surnames)
   */
  lastNames?: string;
  /**
   * First Names (Given Names)
   */
  firstNames?: string;
  /**
   * Additional Names
   */
  addtionalNames?: string;
  /**
   * Prefix for individual's name (Honorific Prefixes)
   */
  namePrefix?: string;
  /**
   * Suffix for individual's name (Honorific Suffixes)
   */
  nameSuffix?: string;
}

/**
 * To specify the components of the sex and gender identity of the object the vCard represents.
 */
export interface Gender {
  /**
   * sex (biological)
   * @description
   * M stands for "male", F stands for "female", O stands for "other", N stands for "none or not applicable", U stands for "unknown".
   */
  sex?: 'M' | 'F' | 'O' | 'N' | 'U';

  /**
   * Gender identity
   */
  text?: string;
}
