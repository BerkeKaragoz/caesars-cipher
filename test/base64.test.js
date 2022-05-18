var assert = require("assert");
var _ = require("../dist/base64");

var MAX_LEGAL_RANGE = 0x80;

var shortText = "Cipher";
var longText =
  "Phasellus tempus ut quam ut vestibulum. Aenean imperdiet tristique nibh, id rutrum elit commodo sit amet. Nam laoreet elit condimentum efficitur auctor. Donec sit amet sapien ut mauris rhoncus suscipit. Donec rutrum tristique egestas. Duis ultrices diam id dolor aliquet, pretium scelerisque mi pharetra. Vivamus et dui consequat, sagittis mi at, dapibus neque. Phasellus vitae quam at lorem mattis vehicula. \nMaecenas lobortis ante cursus elit suscipit facilisis. Curabitur ex nunc, feugiat quis nunc sit amet, varius porta odio. Nulla non lacinia mauris, at ultricies sapien. Pellentesque lacus tellus, rutrum id egestas at, tempus nec est. Fusce ullamcorper suscipit lectus vitae vehicula. Nulla dapibus nibh diam, sed facilisis massa elementum vitae. Morbi sagittis, risus et pellentesque volutpat, ipsum mauris fermentum diam, nec interdum mauris arcu ac nisi. Aenean justo ipsum, maximus sit amet ligula et, egestas lacinia tellus. In varius, quam id interdum pulvinar, nisl velit congue felis, sit amet porta sapien lacus accumsan ligula. Aenean nunc tortor, gravida ut eros ut, luctus varius leo. Proin pellentesque fermentum nunc. Cras non enim blandit, aliquam diam sit amet, pretium dui. Maecenas dolor lectus, pulvinar nec aliquam eget, accumsan a lorem.";

function toBase64(string) {
  return Buffer.from(string).toString("base64");
}

function fromBase64(string) {
  return Buffer.from(string, "base64").toString();
}

describe("Base64", function () {
  describe("Cipher", function () {
    it("should cipher without crashing", function () {
      var shiftAmount = 0;

      assert.equal(
        _.caesarsCipher(shortText, shiftAmount),
        _.caesarsCipher(shortText, shiftAmount),
      );
    });

    it("should shift by zero", function () {
      var shiftAmount = 0;
      assert.equal(
        _.caesarsCipher(shortText, shiftAmount),
        toBase64(shortText),
      );
    });

    it("should shift by one", function () {
      var shiftAmount = 1;

      assert.equal(_.caesarsCipher(shortText, shiftAmount), "R3mxbHWz");
    });

    it("should be able to shift more than the upper boundary", function () {
      var shiftAmount = MAX_LEGAL_RANGE;

      assert.equal(
        _.caesarsCipher(shortText, shiftAmount),
        toBase64(shortText),
      );
    });

    it("should be able to shift long texts", function () {
      var shiftAmount = MAX_LEGAL_RANGE;

      assert.equal(_.caesarsCipher(longText, shiftAmount), toBase64(longText));
    });
  });

  describe("Decipher", function () {
    it("should decipher without crashing", function () {
      var shiftAmount = 0;
      var cipheredText = shortText;

      assert.equal(
        _.caesarsDecipher(cipheredText, shiftAmount),
        _.caesarsDecipher(cipheredText, shiftAmount),
      );
    });

    it("should decipher shift by zero", function () {
      var shiftAmount = 0;
      var cipheredText = toBase64(shortText);

      assert.equal(_.caesarsDecipher(cipheredText, shiftAmount), shortText);
    });

    it("should decipher shift by one", function () {
      var shiftAmount = 1;
      var cipheredText = "R3mxbHWz"; // ciphered shortText by one

      assert.equal(_.caesarsDecipher(cipheredText, shiftAmount), shortText);
    });

    it("should be able to decipher shifted more than the upper boundary", function () {
      var shiftAmount = MAX_LEGAL_RANGE;
      var cipheredText = toBase64(shortText);

      assert.equal(_.caesarsDecipher(cipheredText, shiftAmount), shortText);
    });

    it("should be able to shift long texts", function () {
      var shiftAmount = MAX_LEGAL_RANGE;
      var cipheredText = toBase64(longText);

      assert.equal(_.caesarsDecipher(cipheredText, shiftAmount), longText);
    });
  });
});
