// Change a number into a binary string 
// (only works with integers)
export function ntob(dec: number): string {
  let str = (+dec | 0).toString(2);
  const pad = str.length % 4;
  return (pad === 0)
    ? str
    : str = ("0000" + str).slice(pad);
}

// Change a binary string into number
export function bton(bin: string): number {
  return parseInt(bin.replace(/\s/g, ""), 2);
}

// Change a number into a binary string with 4 group formatting 
// (only works with integers)
export function ntobf(dec: number): string {
  return ntob(dec).replace(/([01]{4,4})/g, "$1 ").trim();
}

// Change a number into a hex string 
// (only works with integers)
export function ntoh(dec: number): string {
  return ['0', ((+dec | 0)).toString(16).toUpperCase()].join('x');
}

// Change a hex string into a number
export function hton(hex: string): number {
  return parseInt(hex, 16);
}

/////////////////////////////////////////////////////////////////

const LOW_MASK = 0b00000000000000001111111111111111;
export function pack64(num: number): string {
  const n = num | 0;
  const h = (n >> 16) & LOW_MASK;
  const l = n & LOW_MASK;
  return pack32(h) + pack32(l);
}

export function pack32(num: number): string {
  return String.fromCharCode(num);
}

export function unpack64(str: string): number {
  if (str.length != 2) throw Error("String not correct length (should be 2 chars)");
  const h = str.charCodeAt(0) | 0;
  const l = str.charCodeAt(1) | 0;
  // shift the highs up
  // 0000 0000 0000 0000 | 0000 0000 0000 0000
  const high = h << 16;
  return (high | l);
}

export function unpack32(str: string): number {
  if (str.length != 1) throw Error("String not correct length (should be 1 char)");
  const h = str.charCodeAt(0) | 0;
  return h;
}
