export function addZeroLeft(number: number, digits: number): string {
  return number.toString().padStart(digits, '0');
}
