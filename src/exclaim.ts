import {
  pack32,
  pack64,
  unpack64,
} from './ntox';

interface Post {
  user: number,
  post: string,
  date: Date,
}

const VERSION = 0b1;
const RESERVED = pack32("!".charCodeAt(0)) + pack32("!".charCodeAt(0));
const CHANNEL = 0b1;

// new Date().getTime() returns milliseconds
// unix time is in seconds
function packDate(d: Date): number {
  return (d.getTime() / 1000) | 0;
}

function unpackDate(n: number): Date {
  return new Date(n * 1000);
}

export function packPost(user: number, body: string, date?: Date): string {
  const d = packDate(date || new Date());

  const post = pack32(VERSION) +                             // version
    RESERVED +                                               // reserved
    pack64(d) +                                              // date
    pack64(CHANNEL) +                                        // channel
    pack64(user) +                                           // user
    body;                                                    // post

  return encodeURIComponent(post);
}

export function unpackPost(packet: string): Post {
  const d = unpack64(packet.slice(3, 5));
  const date = unpackDate(d);
  const user = unpack64(packet.slice(7, 9));
  const post = packet.slice(9);

  return { user, post, date }
}
