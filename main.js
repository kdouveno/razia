tmi = require('tmi.js');
ListEntry = require('./listEntry.js');
open = require('open');
apis = require('./apis.js');
mercrezik = new (require('./mercrezik.js'))();
require('./twitch.js')();
require('./html_server.js')();