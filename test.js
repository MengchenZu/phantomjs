var page = require('webpage').create();

page.viewportSize = {
  width: 1280,
  height: 720
};

/* page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
}; */


// url = 'file:///home/pilot/omnicl512/omniclient/public/slide_render/index.html?#signage'
url = 'file:///media/sf_omnicl512/omniclient/public/slide_render/index.html?#signage'
// url = 'file:///Users/admin/Documents/omnicl512/omniclient/public/slide_render/index.html?#signage'
// url = 'file:///Users/admin/Downloads/slide_render_2/index.html?'


function addDebugEvents(page, system) {

	page.onConsoleMessage = function(msg, lineNum, sourceId) {
	  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
	};

    page.onResourceError = function (resourceError) {
        page.reason = resourceError.errorString;
        page.reason_url = resourceError.url;
    };

    // page.onResourceRequested = function (request) {
    //     system.stdout.writeLine('= onResourceRequested()');
    //     system.stdout.writeLine('  request: ' + JSON.stringify(request, undefined, 4));
    // };
    //
    // page.onResourceReceived = function (response) {
    //     system.stdout.writeLine('= onResourceReceived()');
    //     system.stdout.writeLine('  id: ' + response.id + ', stage: "' + response.stage + '", response: ' + JSON.stringify(response));
    // };

    page.onLoadStarted = function () {
        system.stdout.writeLine('= onLoadStarted()');
        var currentUrl = page.evaluate(function () {
            return window.location.href;
        });
        system.stdout.writeLine('  leaving url: ' + currentUrl);
    };

    page.onLoadFinished = function (status) {
        system.stdout.writeLine('= onLoadFinished()');
        system.stdout.writeLine('  status: ' + status);
    };

    page.onNavigationRequested = function (url, type, willNavigate, main) {
        system.stdout.writeLine('= onNavigationRequested');
        system.stdout.writeLine('  destination_url: ' + url);
        system.stdout.writeLine('  type (cause): ' + type);
        system.stdout.writeLine('  will navigate: ' + willNavigate);
        system.stdout.writeLine('  from page\'s main frame: ' + main);
    };

    page.onResourceError = function (resourceError) {
        system.stdout.writeLine('= onResourceError()');
        system.stdout.writeLine('  - unable to load url: "' + resourceError.url + '"');
        system.stdout.writeLine('  - error code: ' + resourceError.errorCode + ', description: ' + resourceError.errorString);
    };

    page.onError = function (msg, trace) {
        system.stdout.writeLine('= onError()');
        var msgStack = ['  ERROR: ' + msg];
        if (trace) {
            msgStack.push('  TRACE:');
            trace.forEach(function (t) {
                msgStack.push('    -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
            });
        }
        system.stdout.writeLine(msgStack.join('\n'));
    };
}
  var system = require('system');
  addDebugEvents(page,system);
page.open(url, function(status) {
  console.log('Status: ' + status);
  setTimeout(function() {
        page.render('google.png');
        // console.log(page.content);
        phantom.exit();
  }, 2000);
});
