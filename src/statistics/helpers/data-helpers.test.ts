import {
  findMostFrequentOccurances,
  countOccurrences,
  countWordOccurrences,
  deleteDotsAndCommas,
} from "./data-helpers";

describe("findMostFrequentOccurances", () => {
  it("should return an array of most frequent occurrences", () => {
    const obj = {
      apple: 3,
      banana: 2,
      orange: 3,
      mango: 1,
    };

    const result = findMostFrequentOccurances(obj);

    expect(result).toEqual(["apple", "orange"]);
  });

  it("should return an empty array if the input object is empty", () => {
    const obj = {};

    const result = findMostFrequentOccurances(obj);

    expect(result).toEqual([]);
  });

  it("should return an array with a single element if all values in the input object are the same", () => {
    const obj = {
      apple: 2,
      banana: 2,
      orange: 2,
    };

    const result = findMostFrequentOccurances(obj);

    expect(result).toEqual(["apple", "banana", "orange"]);
  });
});

describe("countOccurrences", () => {
  it("should return an object with the count of occurrences for each element in the array", () => {
    const longString = "apple banana orange apple mango";
    const arr = ["apple", "banana", "orange", "mango"];

    const result = countOccurrences(longString, arr);

    expect(result).toEqual({
      apple: 2,
      banana: 1,
      orange: 1,
      mango: 1,
    });
  });

  it("should return an object with all counts as 0 if the longString is empty", () => {
    const longString = "";
    const arr = ["apple", "banana", "orange", "mango"];

    const result = countOccurrences(longString, arr);

    expect(result).toEqual({
      apple: 0,
      banana: 0,
      orange: 0,
      mango: 0,
    });
  });

  it("should return an object with all counts as 0 if the array is empty", () => {
    const longString = "apple banana orange apple mango";
    const arr: string[] = [];

    const result = countOccurrences(longString, arr);

    expect(result).toEqual({});
  });
});

describe("countWordOccurrences", () => {
  it("should return an object with the count of occurrences for each word in the input string", () => {
    const inputString = "apple banana orange apple mango";

    const result = countWordOccurrences(inputString);

    expect(result).toEqual({
      apple: 2,
      banana: 1,
      orange: 1,
      mango: 1,
    });
  });

  it("should return an empty object if the input string is empty", () => {
    const inputString = "";

    const result = countWordOccurrences(inputString);

    expect(result).toEqual({});
  });

  it("should handle case-insensitive word counts", () => {
    const inputString = "Apple apple BANANA banana Orange orange";

    const result = countWordOccurrences(inputString);

    expect(result).toEqual({
      apple: 2,
      banana: 2,
      orange: 2,
    });
  });
});

describe("deleteDotsAndCommas", () => {
  it("should remove dots and commas from the input string", () => {
    const inputString = "Hello, world. This is a test.";

    const result = deleteDotsAndCommas(inputString);

    expect(result).toEqual("Hello world This is a test");
  });

  it("should return the input string as is if there are no dots or commas", () => {
    const inputString = "Hello world This is a test";

    const result = deleteDotsAndCommas(inputString);

    expect(result).toEqual("Hello world This is a test");
  });
});
