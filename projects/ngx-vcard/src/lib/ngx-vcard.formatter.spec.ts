import { VCardFormatter, getMajorVersion } from './ngx-vcard.formatter';
import { VCard } from './types/vCard';

describe('NgxVcardFormatter', () => {
  it('sample test - 2', () => {
    const vCard: VCard = {
      version: '4.0',
      name: { firstNames: 'Forrest', lastNames: 'Gump', namePrefix: 'Mr.' },
      organization: 'Bubba Gump Shrimp Co.',
      title: 'Shrimp Man',
      email: ['forrestgump@example.com'],
      photo: {
        value: 'http://www.example.com/dir_photos/my_photo.gif',
        param: { mediatype: 'image/gif' },
      },
      telephone: [
        {
          value: 'tel:+1-111-555-1212',
          param: { type: ['work', 'voice'], value: 'uri' },
        },
        {
          value: 'tel:+1-404-555-1212',
          param: { type: ['home', 'voice'], value: 'uri' },
        },
      ],
      address: [
        {
          value: {
            label:
              '100 Waters Edge\nBaytown, LA 30314\nUnited States of America',
            street: '100 Waters Edge',
            locality: 'Baytown',
            postalCode: '30314',
            region: 'LA',
            countryName: 'United States of America',
          },
          param: { type: ['work'], pref: 1 },
        },
        {
          value: {
            label:
              '42 Plantation St.\nBaytown, LA 30314\nUnited States of America',
            street: '42 Plantation St.',
            locality: 'Baytown',
            postalCode: '30314',
            region: 'LA',
            countryName: 'United States of America',
          },
          param: { type: ['home'] },
        },
      ],
      rev: '20080424T195243Z',
    };
    expect(VCardFormatter.getVCardAsString(vCard)).toEqual(
      `BEGIN:VCARD
VERSION:4.0
FN:Forrest Gump
N:Gump;Forrest;;Mr.;
ORG:Bubba Gump Shrimp Co.
ADR;TYPE=work;PREF=1;LABEL="100 Waters Edge\\nBaytown\, LA 30314\\nUnited States of America":;;100 Waters Edge;Baytown;LA;30314;United States of America
ADR;TYPE=home;LABEL="42 Plantation St.\\nBaytown\, LA 30314\\nUnited States of America":;;42 Plantation St.;Baytown;LA;30314;United States of America
TEL;VALUE=uri;TYPE="work,voice":tel:+1-111-555-1212
TEL;VALUE=uri;TYPE="home,voice":tel:+1-404-555-1212
EMAIL:forrestgump@example.com
TITLE:Shrimp Man
PHOTO;MEDIATYPE=image/gif:http://www.example.com/dir_photos/my_photo.gif
REV:20080424T195243Z
END:VCARD
`,
    );
  });

  it('use default values', () => {
    const vCard: VCard = {
      version: '3.0',
      name: { firstNames: 'John', lastNames: 'Doe' },
      telephone: ['+1234567890'],
    };
    expect(VCardFormatter.getVCardAsString(vCard)).toEqual(
      `BEGIN:VCARD
VERSION:3.0
FN:John Doe
N:Doe;John;;;
TEL;TYPE=voice:+1234567890
END:VCARD
`,
    );
  });

  it('overwrite default values', () => {
    const vCard: VCard = {
      version: '3.0',
      name: { firstNames: 'John', lastNames: 'Doe' },
      telephone: [
        {
          value: '+1234567890',
          param: {
            type: 'work',
          },
        },
      ],
    };
    expect(VCardFormatter.getVCardAsString(vCard)).toEqual(
      `BEGIN:VCARD
VERSION:3.0
FN:John Doe
N:Doe;John;;;
TEL;TYPE=work:+1234567890
END:VCARD
`,
    );
  });

  it('empty vCard Test', () => {
    const vCard: VCard = {};
    const string = VCardFormatter.getVCardAsString(vCard);
    expect(string).toEqual(
      `BEGIN:VCARD
VERSION:4.0
FN:
N:;;;;
END:VCARD
`,
    );
  });

  it('[Helper Functions] getMajorVersion()', () => {
    expect(getMajorVersion('4.0')).toEqual(4);
  });

  it('[Helper Functions] getMajorVersion() - empty String', () => {
    expect(getMajorVersion('')).toEqual(4);
  });

  xit('sample test - 1', () => {
    const vCard: VCard = {
      version: '3.0',
      name: { firstNames: 'John', lastNames: 'Doe' },
      organization: 'Example.com Inc.',
      title: 'Imaginary test person',
      email: [
        { value: 'johnDoe@example.org', param: { type: ['work', 'cell'] } },
      ],
    };
    expect(VCardFormatter.getVCardAsString(vCard)).toEqual(
      `BEGIN:VCARD
VERSION:3.0
N:Doe;John;;;
FN:John Doe
ORG:Example.com Inc.;
TITLE:Imaginary test person
EMAIL;type=WORK:johnDoe@example.org
TEL;type=WORK;type=pref:+1 617 555 1212
TEL;type=WORK:+1 (617) 555-1234
TEL;type=CELL:+1 781 555 1212
TEL;type=HOME:+1 202 555 1212
item1.ADR;type=WORK:;;2 Enterprise Avenue;Worktown;NY;01111;USA
item1.X-ABADR:us
item2.ADR;type=HOME;type=pref:;;3 Acacia Avenue;Hoemtown;MA;02222;USA
item2.X-ABADR:us
NOTE:John Doe has a long and varied history\, being documented on more police files that anyone else. Reports of his death are alas numerous.
item3.URL;type=pref:http\://www.example/com/doe
item3.X-ABLabel:_$!<HomePage>!$_
item4.URL:http\://www.example.com/Joe/foaf.df
item4.X-ABLabel:FOAF
item5.X-ABRELATEDNAMES;type=pref:Jane Doe
item5.X-ABLabel:_$!<Friend>!$_
CATEGORIES:Work,Test group
X-ABUID:5AD380FD-B2DE-4261-BA99-DE1D1DB52FBE\:ABPerson
END:VCARD
`,
    );
  });

  xit('sample test - 3', () => {
    const vCard: VCard = {
      version: '4.0',
      formattedName: { firstNames: 'Simon', lastNames: 'Perreault' },
      name: {
        firstNames: 'Simon',
        lastNames: 'Perreault',
        nameSuffix: 'ing. jr,M.Sc.',
      },
      birthday: new Date(2003, 2),
      anniversary: new Date(2009, 8, 8, 14, 30),
      gender: { sex: 'M' },
      language: [
        { value: 'fr', param: { pref: 1 } },
        { value: 'en', param: { pref: 2 } },
      ],
      organization: { value: 'Viagenie', param: { type: ['work'] } },
      address: [
        {
          value: {
            extendedAddress: 'Suite D2-630',
            street: '2875 Laurier',
            locality: 'Quebec',
            postalCode: 'G1V 2M2',
            region: 'QC',
            countryName: 'Canada',
          },
          param: { type: ['work'] },
        },
      ],
      telephone: [
        {
          value: 'tel:+1-418-656-9254',
          param: { value: 'uri', type: ['work', 'voice'], pref: 1 },
        },
        {
          value: 'tel:+1-418-262-6501',
          param: { value: 'uri', type: ['work', 'cell', 'video', 'text'] },
        },
      ],

      email: [
        { value: 'simon.perreault@viagenie.ca', param: { type: 'work' } },
      ],
      geoPosition: '',
      photo: {
        value: 'http://www.example.com/dir_photos/my_photo.gif',
        param: { mediatype: 'image/gif' },
      },
    };
    expect(VCardFormatter.getVCardAsString(vCard)).toEqual(`BEGIN:VCARD
    VERSION:4.0
    FN:Simon Perreault
    N:Perreault;Simon;;;ing. jr,M.Sc.
    BDAY:--0203
    ANNIVERSARY:20090808T1430-0500
    GENDER:M
    LANG;PREF=1:fr
    LANG;PREF=2:en
    ORG;TYPE=work:Viagenie
    ADR;TYPE=work:;Suite D2-630;2875 Laurier;Quebec;QC;G1V 2M2;Canada
    TEL;VALUE=uri;TYPE="work,voice";PREF=1:tel:+1-418-656-9254;ext=102
    TEL;VALUE=uri;TYPE="work,cell,voice,video,text":tel:+1-418-262-6501
    EMAIL;TYPE=work:simon.perreault@viagenie.ca
    GEO;TYPE=work:geo:46.772673,-71.282945
    KEY;TYPE=work;VALUE=uri:http://www.viagenie.ca/simon.perreault/simon.asc
    TZ:-0500
    URL;TYPE=home:http://nomis80.org
    END:VCARD
    `);
  });
});

describe('regression tests', () => {
  it('address double colon (no label)', () => {
    const vCard: VCard = {
      address: [{ street: '1 Apple Park Way' }],
      version: '3.0',
    };
    const string = VCardFormatter.getVCardAsString(vCard);
    expect(string).toEqual(
      `BEGIN:VCARD
VERSION:3.0
FN:
N:;;;;
ADR:;;1 Apple Park Way;;;;
END:VCARD
`,
    );
  });

  it('address Test with values (label)', () => {
    const vCard: VCard = {
      address: [
        {
          label: '1 Apple Park Way',
          street: '100 Waters Edge',
          locality: 'Baytown',
          postalCode: '30314',
          region: 'LA',
          countryName: 'United States of America',
        },
      ],
      version: '3.0',
    };
    const string = VCardFormatter.getVCardAsString(vCard);
    expect(string).toEqual(
      `BEGIN:VCARD
VERSION:3.0
FN:
N:;;;;
ADR;LABEL="1 Apple Park Way":;;100 Waters Edge;Baytown;LA;30314;United States of America
END:VCARD
`,
    );
  });
});
