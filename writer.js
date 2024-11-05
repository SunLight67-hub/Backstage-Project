/* eslint-disable no-multi-assign */
/* eslint-disable func-names */

/* eslint-disable vars-on-top */
const ResponsePayload = function (code, payload) {
  this.code = code;
  this.payload = payload;
};

exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
};

// New logError function to handle server-side logging without response
exports.logError = function (errorDetails) {
  console.error("Server Error:", JSON.stringify(errorDetails, null, 2));
};

const writeJson = (exports.writeJson = function (response, arg1, arg2) {
  let code;
  let payload;

  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if (arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else if (arg1 && Number.isInteger(arg1)) {
    code = arg1;
  }
  if (code && arg1) {
    payload = arg1;
  } else if (arg1) {
    payload = arg1;
  }

  if (!code) {
    code = 200; // Default to 200 if no response code is provided
  }

  if (response && typeof response.writeHead === 'function' && typeof response.end === 'function') {
    if (arg1.status === 500 || arg2 === 500) {
      const noData = JSON.stringify({ status: 'failure', error: 'data validation' }, null, 2);

      if (!response.headersSent) {
        response.writeHead(203, { 'Content-Type': 'application/json' });
        response.end(noData);
      }
    } else {
      if (typeof payload === 'object') {
        payload = JSON.stringify(payload, null, 2);
      }
      if (!response.headersSent) {
        response.writeHead(code, { 'Content-Type': 'application/json' });
        response.end(payload);
      }
    }
  } else {
    exports.logError(payload || "Invalid response object passed to writeJson");
  }
});
