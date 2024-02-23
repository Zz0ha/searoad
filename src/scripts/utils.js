import { VARS } from "./variables";

//logo URL
export const getLogoURL = (logoName, ext = "png") => {
  return VARS.PATH.CDN_URL + `logo/${logoName}.${ext}`;
};

//image URL
export const getImageURL = (imageName, ext = "png") => {
  return VARS.PATH.CDN_URL + `images/${imageName}.${ext}`;
};

//icon URL
export const getIconURL = (iconName, ext = "png") => {
  return VARS.PATH.CDN_URL + `icons/${iconName}.${ext}`;
};

// Datetime
const padDatetime = (datetime_str) => {
  datetime_str = datetime_str.toString();
  return datetime_str.length === 1 ? '0' + datetime_str : datetime_str;
};

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

export const formatDatetime = (datetime) => {
  const yyyy = padDatetime(datetime.getFullYear());
  const mm = padDatetime(datetime.getMonth() + 1);
  const dd = padDatetime(datetime.getDate());
  const WD = WEEKDAY[datetime.getDay()];
  const HH = padDatetime(datetime.getHours());
  const MM = padDatetime(datetime.getMinutes());
  const SS = padDatetime(datetime.getSeconds());
  return `${yyyy}-${mm}-${dd} (${WD}) ${HH}:${MM}:${SS}`;
};

export const formatDatetimeFromString = (datetime_str) => {
  if(!datetime_str) return '-';
  const datetime = new Date(datetime_str);
  return formatDatetime(datetime);
}

// Internationalization
const koNf = new Intl.NumberFormat('ko-KR');

export const formatAccountNumber = (number) => {
  return koNf.format(number);
}

// JSON Pretty Representation
export const markUpJSON = (json_obj) => {
  if (typeof json_obj != 'string') {
    json_obj = JSON.stringify(json_obj, null, 2);
  }
  json_obj = json_obj.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json_obj.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = 'markup-json-number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'markup-json-key';
          } else {
              cls = 'markup-json-string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'markup-json-boolean';
      } else if (/null/.test(match)) {
          cls = 'markup-json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  }).replace(/\n/g, '<br/>');
}

// Generation
export function randomIdLetterDigit(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
