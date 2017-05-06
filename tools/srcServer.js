// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config,{settings} from '../webpack.config.dev';
import proxy from 'http-proxy-middleware';

const bundler = webpack(config);

let middlewares= [
  historyApiFallback(),

  webpackDevMiddleware(bundler, {
    // Dev middleware can't access config, so we provide publicPath
    publicPath: config.output.publicPath,

    // These settings suppress noisy webpack output so only errors are displayed to the console.
    noInfo: false,
    quiet: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },

    // for other settings see
    // http://webpack.github.io/docs/webpack-dev-middleware.html
  }),

  // bundler should be the same as above
  webpackHotMiddleware(bundler)
];

/*eslint no-unused-vars: ["error", { "args": "none" }]*/

// const paths = ["/api"];

// paths.map(key=>{
  middlewares.unshift( proxy("/api", {
    target: settings.api.url,
    changeOrigin: true,
    logLevel: "debug",
    secure: settings.api.secure,
    onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader('Content-Type', 'application/json');
    },
    onProxyRes(proxyRes, req, res){
      delete proxyRes.headers['Access-Control-Allow-Origin'];
    }
  }));
// });

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  port: 3005,
  ui: {
    port: 3006
  },
  server: {
    baseDir: 'src',
    middleware:middlewares
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
});
