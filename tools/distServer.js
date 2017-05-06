// This file configures a web server for testing the production build
// on local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import {chalkProcessing} from './chalkConfig';

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 4000,
  ui: {
    port: 4001
  },
  server: {
    baseDir: '../webserver/src/main/resources/webapp/webpackoutput',
    serveStaticOptions: {
      extensions: ['js']
    }
  },
  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});
