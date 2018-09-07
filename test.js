var page = require('webpage').create();

page.viewportSize = {
  width: 640,
  height: 360
};

/* page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
}; */


url = 'file:///home/pilot/omnicl512/omniclient/public/slide_render/index.html?#signage'
// url = 'file:///media/sf_omnicl512/omniclient/public/slide_render/index.html?#signage'
// url = 'file:///Users/admin/Documents/omnicl512/omniclient/public/slide_render/index.html?#signage'
// url = 'file:///Users/admin/Downloads/slide_render_2/index.html?'
page.open(url, function(status) {
  console.log('Status: ' + status);
  setTimeout(function() {
        page.render('google.png');
        // console.log(page.content);
        phantom.exit();
  }, 2000);
});
