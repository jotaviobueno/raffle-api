export function smallestLargestNumberUtil(digits: number): {
  initial: number;
  final: number;
  totalNumbers: number;
} {
  const smallestNumber = 0;
  const largestNumber = Math.pow(10, digits) - 1;

  return {
    initial: smallestNumber,
    final: largestNumber,
    totalNumbers: Math.pow(10, digits),
  };
}
