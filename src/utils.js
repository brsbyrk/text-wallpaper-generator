// @flow
export function getElement(id: string): HTMLElement {
  return window.document.getElementById(id);
}

export function getBody(): HTMLBodyElement {
  return window.document.getElementsByTagName('body')[0];
}

export function kvoIndexed(
  anObject: Object,
): Array<{ key: string, value: any, index: number }> {
  return Object.keys(anObject).map((key, index) => ({
    key,
    value: anObject[key],
    index,
  }));
}

export function objForEach(anObject: Object, func: (value: any) => void) {
  Object.keys(anObject).forEach((key) => func(anObject[key]));
}

export const callOnNextFrame = (callback: Function) => () =>
  window.setTimeout(callback, 0.2);

export const sleep = (duration: number) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

export function getStyle(el: HTMLElement, styleProp: string) {
  // based on: https://stackoverflow.com/a/4392968/2172057
  const x: HTMLElement = el;
  let y = undefined;
  y = document.defaultView
    .getComputedStyle(x, null)
    .getPropertyValue(styleProp);
  return y;
}

export function insertStyle(
  elementId: string,
  pseudoClass: string,
  kvo: Object,
) {
  const stylesheet: any = document.styleSheets[0];
  const stylesString = `{${kvoIndexed(kvo)
    .map(({ key, value }) => `${key}: ${value}`)
    .join('; ')}}`;
  const getlastIndex = () => stylesheet.cssRules.length;
  ['', '-moz-', '-webkit-'].forEach((vendorPrefix) => {
    try {
      stylesheet.insertRule(
        `#${elementId}::${vendorPrefix}${pseudoClass} ${stylesString}`,
        getlastIndex(),
      );
    } catch (e) {} // eslint-disable-line
  });
}

export function isMobile() {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf('IEMobile') !== -1
  );
}
