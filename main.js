tmi = require('tmi.js');
ListEntry = require('./listEntry.js');
open = require('open');
mercrezik = new (require('./mercrezik.js'))();
require('./twitch.js')();
require('./html_server.js')();