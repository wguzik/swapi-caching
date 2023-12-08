export function countOccurrences(
  longString: string,
  arr: string[]
): Record<string, number> {
  let countObject = arr.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});

  for (const key in countObject) {
    if (countObject.hasOwnProperty(key)) {
      const regex = new RegExp(key, "g");
      const matches = longString.match(regex);
      countObject[key] = matches ? matches.length : 0;
    }
  }

  return countObject;
}

export function findMostFrequentOccurances(
  obj: Record<string, number>
): string[] {
  let maxCount = 0;
  let mostFrequentOccurances: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const count = obj[key];

      if (count > maxCount) {
        maxCount = count;
        mostFrequentOccurances = [key];
      } else if (count === maxCount) {
        mostFrequentOccurances.push(key);
      }
    }
  }

  return mostFrequentOccurances;
}

export function countWordOccurrences(
  inputString: string
): Record<string, number> {
  const words = inputString.split(/\s+/);
  const wordCountMap = new Map<string, number>();

  words.forEach((word) => {
    const normalizedWord = word.toLowerCase();
    const count = wordCountMap.get(normalizedWord) || 0;
    wordCountMap.set(normalizedWord, count + 1);
  });

  return Object.fromEntries(wordCountMap);
}

export function deleteDotsAndCommas(inputString: string): string {
  return inputString.replace(/[.,]/g, "");
}
