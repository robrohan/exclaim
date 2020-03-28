import { packPost, unpackPost } from './exclaim';

declare const window: any

const post = packPost(0b1, "There is no there out there");


// make a bunch of example posts
const body = document.querySelector("body");
const a = document.createElement("a");
a.setAttribute("href", "#" + post);
a.appendChild(document.createTextNode("Example 1"));
body.appendChild(a)


///
if (window.location.hash) {
  const packet = decodeURIComponent(window.location.hash.slice(1));
  const post = unpackPost(packet);
  console.log(post);
}