/* global window, document */
if (! window._babelPolyfill) {
  require('@babel/polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './containers/Admin.jsx';
import ReactDOMServer from 'react-dom/server';


document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <Admin  />,
    document.getElementById('wp-reactivate-admin')
  );



  // var html = ReactDOMServer.renderToString(<MyComponent />);

});
