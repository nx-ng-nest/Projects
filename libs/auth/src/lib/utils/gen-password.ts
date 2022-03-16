/**
 * Generate strong password
 * @param length
 * @returns
 */
export function genPassword(length = 10) {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = lowerCase.toUpperCase();
  const numberChars = '0123456789';
  const specialChars = '!@$%+-_?^{}[]|:;&*()';

  const pick = (text: string) => text[Math.floor(Math.random() * text.length)];

  const pass = [
    specialChars,
    numberChars,
    numberChars,
    numberChars,
    numberChars,
    specialChars,
    lowerCase,
    specialChars,
    numberChars,
    lowerCase,
    lowerCase,
    lowerCase,
    numberChars,
    upperCase,
    specialChars,
    numberChars,
    specialChars,
    specialChars,
    specialChars,
    lowerCase,
    upperCase,
  ]
    .map((e) => pick(e))
    .join('');
  return pass;
}
