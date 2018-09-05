var page = require('webpage').create();

url = 'file:///home/pilot/omnicl512/omniclient/public/slide_render/index.html?#signage'
page.open(url, function(status) {
  console.log('Status: ' + status);
  setTimeout(function() {
        page.render('google.png');
        phantom.exit();
  }, 3000);
});
