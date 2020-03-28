import { pack64, ntobf, pack32, unpack64 } from './ntox';

declare const window: any

// Max chars in the URL: 2000
// 0110 0010 0001 0001  16

// new Date().getTime() returns milliseconds
// unix time is in seconds
const d = (new Date().getTime() / 1000) | 0;

//////////////////////////////////////////////////////////////////////////
// HEADER
// ----------------------------------------------------------------------
//                         high  0            low  1                   
// Version  | 16 | 0000 0000 0000 0001 |                     |  0 - 65535
// Reserved | 32 | 0000 0000 0010 0001 | 0000 0000 0010 0001 |  0 - 4294967295
// Date     | 32 | 0000 0000 0000 0000 | 0000 0000 0000 0000 |  0 - 4294967295
// Channel  | 32 | 0000 0000 0000 0000 | 0000 0000 0000 0000 |  0 - 4294967295
// User     | 32 | 0000 0000 0000 0000 | 0000 0000 0000 0000 |  0 - 4294967295
//
// BODY
// ----------------------------------------------------------------------
// Post     | 2000*32 |
//////////////////////////////////////////////////////////////////////////

const header = pack32(0b1) +
  pack32("!".charCodeAt(0)) +
  pack32("!".charCodeAt(0)) +
  pack64(d);

if (!window.location.hash) {
  window.location.hash = encodeURIComponent(header);
} else {
  const packet = decodeURIComponent(window.location.hash.slice(1));
  console.log(packet);

  const d = unpack64(packet.slice(3, 5));
  console.log(new Date(d * 1000));
}