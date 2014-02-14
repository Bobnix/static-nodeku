static-nodeku
=============

A light static file server for heroku based on Node.js

Quick Start Guide
-----------------
This is all you need to get your site out there.

1. Sign up for a heroku account
1. Download the heroku toolbelt
1. Run `heroku login` and enter your credentials
1. Clone static-nodeku
1. Load your html, css and js into the site folder
  + Make sure this matches the url structure you expect i.e. url/path/to/file.css
1. Cd to the new directory and run `heroku create`
1. Run `git add .`
1. Run `git commit -a -m "MESSAGE"`
1. Run `git push heroku master`
1. Run `heroku ps:scale web=1`
