import { CaesarsCipher } from "./types";

/** UTF-8 legal value range */
const MAX_LEGAL_VALUE = 0x80;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const modulo = (a: number, n: number): number => ((a % n) + n) % n;

const toCodeArray = (string: string): Uint8Array => {
  return encoder.encode(string);
};

const fromCodeArray = (arr: Uint8Array): string => {
  return decoder.decode(arr);
};

export const _caesarsCipher = (
  text: string,
  shiftAmount: number = 1,
  toBase64: (string: string) => string,
): string => {
  const codes = toCodeArray(toBase64(text));
  const ciphered = new Uint8Array(codes);

  ciphered.map((value: number, i: number) => {
    return (ciphered[i] = modulo(value + shiftAmount, MAX_LEGAL_VALUE));
  });

  return fromCodeArray(ciphered);
};

export const _caesarsDecipher = (
  cipheredText: Parameters<CaesarsCipher>["0"],
  shiftAmount: Parameters<CaesarsCipher>["1"],
  fromBase64: (string: string) => string,
): string => {
  const cipheredCodes = toCodeArray(cipheredText);
  const decipheredCodes = new Uint8Array(cipheredCodes);

  decipheredCodes.map((value: number, i: number) => {
    return (decipheredCodes[i] = modulo(value - shiftAmount, MAX_LEGAL_VALUE));
  });

  return fromBase64(fromCodeArray(decipheredCodes));
};
