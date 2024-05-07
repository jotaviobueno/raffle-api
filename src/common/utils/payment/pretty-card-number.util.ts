export function prettyCardNumber(cardNumber: string): string {
  return cardNumber.replace(/^[\d-\s]+(?=\d{4})/, '************');
}
