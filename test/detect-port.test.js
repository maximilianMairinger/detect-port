/* ================================================================
 * detect-port by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Mar 17 2015 00:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const detectPort = require('..');

describe('detect port test', () => {

  it('callback with occupied port', done => {
    var _port = 80;
    detectPort(_port, (err, port) => {
      if (err) {
        console.log(err);
      }
      port.should.within(_port, 65535);
      done();
    });
  });

  it('callback with wrong arguments', done => {
    detectPort('8080', err => {
      if (err) {
        err.should.containEql('wrong type of arguments');
      }
      done();
    });
  });

  it('generator usage', function *() {
    var _port = 8080;
    try {
      var port = yield detectPort(8080);
      port.should.within(_port, 65535);
    } catch (err) {
      console.log(err);
    }
  });

  it('promise usage', function *() {
    detectPort(8080)
      .then(port => {
        console.log(port);
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('generator with wrong arguments', function *() {
    try {
      yield detectPort();
    } catch (err) {
      err.should.containEql('wrong number of arguments');
    }

    try {
      yield detectPort('8080');
    } catch (err) {
      err.should.containEql('wrong type of arguments');
    }
  });
});
