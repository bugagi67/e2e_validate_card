import puppeteer from "puppeteer";

describe("Card Validation Tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:9000");
  });

  afterAll(async () => {
    await browser.close();
  });

  async function testCardNumber(cardNumber, expectedType) {
    const inputSelector = ".input_card_number";
    const buttonSelector = ".button_valid";

    await page.waitForSelector(inputSelector);
    await page.$eval(inputSelector, (el) => (el.value = ""));
    await page.type(inputSelector, cardNumber);
    await page.click(buttonSelector);

    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 500)),
    );

    const icons = await page.$$(".card");
    for (let icon of icons) {
      const type = await icon.evaluate((el) => el.className);
      const opacity = await icon.evaluate((el) => getComputedStyle(el).opacity);

      if (type.includes(expectedType)) {
        expect(opacity).toBe("1");
      } else {
        expect(opacity).toBe("0.3");
      }
    }
  }

  test("Visa card validation", async () => {
    await testCardNumber("4929213933194051", "visa");
  });

  test("Master card validation", async () => {
    await testCardNumber("5105105105105100", "master");
  });

  test("Amex card validation", async () => {
    await testCardNumber("378282246310005", "amex");
  });

  test("MIR card validation", async () => {
    await testCardNumber("2201382000000013", "mir");
  });

  test("Discover card validation", async () => {
    await testCardNumber("6011111111111117", "discover");
  });

  test("JCB card validation", async () => {
    await testCardNumber("3530111333300000", "jcb");
  });

  test("Diners_club card validation", async () => {
    await testCardNumber("30569147814683", "diners_club");
  });
});
