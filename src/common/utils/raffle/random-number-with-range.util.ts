export function randomNumberWithRangeUtil(
  min: number,
  max: number,
  digits: number,
): string {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString().padStart(digits, '0');
}
