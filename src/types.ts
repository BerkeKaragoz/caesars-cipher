export type Base64Converter = (string: string) => string;

export type CaesarsCipher = (text: string, shiftAmount: number) => string;

export type CaesarsDecipher = (
  cipheredText: string,
  shiftAmount: number,
) => string;
