# Server

This server listens for changes from the client (editor plugin, sending code to
`/notify`) and relays these changes to subscribers (browser extension(s)).


start server
nodemon server/index.js


open client
open server/index.html

