export function generateUniqueRandom(
  min: number,
  max: number,
  excludeSet: Set<number>
): number {
  let num: number;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludeSet.has(num));

  return num;
}
