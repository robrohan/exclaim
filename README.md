# Exclaim

There is no there out there

Exclaim is a wacky idea I am playing around with. It's a way to create posts that live only within a URL. There is no server that exists, just URLs on a page, in a cache or on the network somewhere.

The idea is not fully flushed out. This is a WIP.

A post so far looks like this:

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
    // Post     | ~2000 chars? |
    //////////////////////////////////////////////////////////////////////////

(the ID is the URL)

And the post will live "after the hash" on the URL.

