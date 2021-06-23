const moment = require('moment');

export const isInFuture = (dateString, dateStrToCompare) => {
  return moment(dateString).diff(moment(dateStrToCompare)) > 0;
};

export function isIOSSafari() {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  return iOSSafari;
}
