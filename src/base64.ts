import { Base64Converter, CaesarsCipher, CaesarsDecipher } from "./types";
import { _caesarsCipher, _caesarsDecipher } from "./base";

const toBase64: Base64Converter = (string) =>
  Buffer.from(string).toString("base64");

const fromBase64: Base64Converter = (string) =>
  Buffer.from(string, "base64").toString();

export const base64CaesarsCipher: CaesarsCipher = (text, shiftAmount) =>
  _caesarsCipher(text, shiftAmount, toBase64);

export const base64CaesarsDecipher: CaesarsDecipher = (
  cipheredText,
  shiftAmount,
) => _caesarsDecipher(cipheredText, shiftAmount, fromBase64);
