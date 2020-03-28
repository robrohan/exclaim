import 'jest';
import {
  ntobf,
  ntoh,
  pack32,
  unpack32,
  pack64,
  unpack64,
} from './ntox';

describe("Number To...", () => {
  test('Binary with format - word', () => {
    expect(ntobf(8)).toEqual("1000");
  });

  test('Binary with format - double word', () => {
    expect(ntobf(17)).toEqual("0001 0001");
  });

  test('Binary with format - 64', () => {
    expect(ntobf(1585377651)).toEqual("0101 1110 0111 1110 1111 0001 0111 0011");
  });

  test('Hex format - 64', () => {
    expect(ntoh(1585377651)).toEqual("0x5E7EF173");
  });

  test('Pack 64 bits into char package', () => {
    const n = 0b10000100001000010001001001001000;
    const pk = pack64(n);
    expect(pk).toEqual("萡ቈ");
  });

  test('Pack two 32 bits into a 64 bit char package', () => {
    const nh = 0b01000001; // 65
    const nl = 0b01000010; // 66
    const pk = pack32(nh) + pack32(nl);
    expect(pk).toEqual("AB");
  });

  test('Unpack a 32 bit char package', () => {
    const nh = 0b01000001; // 65
    const upk = unpack32("A");
    expect(upk).toEqual(nh);
  });

  test('Unpack 64 bit number from char string', () => {
    const ch = String.fromCharCode(0b00100011); // 35
    const cl = String.fromCharCode(0b01000110); // 70

    const actual = unpack64(ch + cl);

    // wont pad extra 0000 0000
    expect(ntobf(actual)).toEqual("0010 0011 0000 0000 0100 0110");
  });

})

