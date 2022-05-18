import { _caesarsCipher, _caesarsDecipher } from "./base";
import { Base64Converter, CaesarsCipher, CaesarsDecipher } from "./types";

const toBase64: Base64Converter = (string) => encodeURIComponent(string);

const fromBase64: Base64Converter = (string) => decodeURIComponent(string);

export const caesarsCipher: CaesarsCipher = (text, shiftAmount) =>
  _caesarsCipher(text, shiftAmount, toBase64);

export const caesarsDecipher: CaesarsDecipher = (cipheredText, shiftAmount) =>
  _caesarsDecipher(cipheredText, shiftAmount, fromBase64);
