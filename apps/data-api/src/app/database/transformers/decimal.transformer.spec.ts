import { DecimalTransformer } from "./decimal.transformer";

const decimalTransformer = new DecimalTransformer();

describe("to", () => {
  test("Return a number with 2 decimals", () => {
    const result = decimalTransformer.to(1.2345);
    expect(result).toEqual("1.23");
  })

  test("Return type string when pass a number", () => {
    expect(typeof decimalTransformer.to(1.23)).toEqual("string");
  })
});


describe("from", () => {
  test("Return null when pass null or undefined", () => {
    expect(decimalTransformer.from(null)).toEqual(null);
    expect(decimalTransformer.from(undefined)).toEqual(null);
  })

  test("Return float when pass a value", () => {
    expect(typeof decimalTransformer.from("2334.23")).toEqual("number");
  })
});
