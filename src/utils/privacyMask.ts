export function maskPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length >= 10) {
    const ddd = digits.slice(0, 2);
    const lastDigits = digits.slice(-2);
    return `(${ddd}) •••••-••${lastDigits}`;
  }
  return phone;
}

export function maskStreetAddress(address: string): string {
  const parts = address.split(',');
  if (parts.length > 1) {
    const street = parts[0].trim();
    const cityOrRest = parts.slice(1).join(',').trim();
    return `${street.slice(0, 10)}***, ${cityOrRest}`;
  }
  if (address.length > 12) {
    return `${address.slice(0, 10)}***`;
  }
  return address;
}
