import { _caesarsCipher, _caesarsDecipher } from "./base";
import { Base64Converter, CaesarsCipher, CaesarsDecipher } from "./types";

const encodeURI: Base64Converter = (string) => encodeURIComponent(string);

const decodeURI: Base64Converter = (string) => decodeURIComponent(string);

export const caesarsCipher: CaesarsCipher = (text, shiftAmount) =>
  _caesarsCipher(text, shiftAmount, encodeURI);

export const caesarsDecipher: CaesarsDecipher = (cipheredText, shiftAmount) =>
  _caesarsDecipher(cipheredText, shiftAmount, decodeURI);
