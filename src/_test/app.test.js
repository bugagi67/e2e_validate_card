import { validateLuhn, detectCardType } from "../js/app";

describe("validateLuhn", () => {
  test("should return true for valid card numbers", () => {
    expect(validateLuhn("4532015112830366")).toBe(true); // valid Visa
    expect(validateLuhn("6011514433546201")).toBe(true); // valid Discover
    expect(validateLuhn("379354508162306")).toBe(true); // valid American Express
  });

  test("should return false for invalid card numbers", () => {
    expect(validateLuhn("4532015112830367")).toBe(false); // invalid Visa
    expect(validateLuhn("6011514433546202")).toBe(false); // invalid Discover
    expect(validateLuhn("379354508162307")).toBe(false); // invalid American Express
  });

  test("should return false for non-numeric input", () => {
    expect(validateLuhn("abcd1234efgh5678")).toBe(false);
  });
});

describe("detectCardType", () => {
  test('should return "visa" for valid Visa card numbers', () => {
    expect(detectCardType("4111111111111111")).toBe("visa");
    expect(detectCardType("4012888888881881")).toBe("visa");
  });

  test('should return "master" for valid MasterCard card numbers', () => {
    expect(detectCardType("5105105105105100")).toBe("master");
    expect(detectCardType("5453010000074468")).toBe("master");
  });

  test('should return "amex" for valid American Express card numbers', () => {
    expect(detectCardType("378282246310005")).toBe("amex");
    expect(detectCardType("371449635398431")).toBe("amex");
  });

  test('should return "mir" for valid MIR card numbers', () => {
    expect(detectCardType("2200123456789010")).toBe("mir");
  });

  test('should return "discover" for valid Discover card numbers', () => {
    expect(detectCardType("6011111111111117")).toBe("discover");
    expect(detectCardType("6011000990139424")).toBe("discover");
  });

  test('should return "jcb" for valid JCB card numbers', () => {
    expect(detectCardType("3528000000000000")).toBe("jcb");
    expect(detectCardType("3530111333300000")).toBe("jcb");
  });

  test('should return "diners_club" for valid Diners Club card numbers', () => {
    expect(detectCardType("30481314081726")).toBe("diners_club");
    expect(detectCardType("30569147814683")).toBe("diners_club");
  });

  test("should return undefined for invalid or unknown card numbers", () => {
    expect(detectCardType("1234567890123456")).toBeUndefined();
    expect(detectCardType("")).toBeUndefined();
    expect(detectCardType("0000000000000000")).toBeUndefined();
  });
});
