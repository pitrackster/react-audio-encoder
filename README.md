# react-audio-encoder

Minimal audio encoder app using ReactJS and ffmpeg

The zip created is sent as blob to the client... nothing live on the server after the end of the process.

This app is intended for my personal use:
- no error handled
- no control of any input

...

### Install

`npm install && npm run webpack`

#### You might need to set up properly your php.ini `upload_max_filesize` && `post_max_size` entry

> (In ubuntu / php 7 you can find this file in `/etc/php/7.0/apache2/php.ini`)

### scripts

- `npm run webpack` - build javascript
- `npm run watch` - build javascript and watch for changes


### Warnings

The process might take a long time depending on :

- your connection speed
- the amount of files you want to process
- the length of those files...

### TODO

handle errors and check inputs ;-)