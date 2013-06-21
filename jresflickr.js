function flickrGetPhotoIDfromURL(url) {
  var result = url.match('/photos/[^/]+/([0-9]+)/');
  return result[1];
}

(function($){

  $.fn.jResFlick = function() {
    return this.each(function() {
      var apiKey = '2ecdb5f538e1a1bfe91ead6ce8ae9326';

      var thisdiv = $(this);
      var divw = thisdiv.width();
      var pageurl = thisdiv.attr('furl');
      var apiurl = 'http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + flickrGetPhotoIDfromURL(pageurl);

      $.getJSON(apiurl + "&format=json&jsoncallback=?", function(data) {
        var i = 0, 
            j = data.sizes.size.length;

        while ((i <= j) && (data.sizes.size[i].width < divw)) { i++ };
        thisdiv.html('<a href="' + pageurl + '"><img src="' + data.sizes.size[i - 1].source + '" /></a>');
      });
    });
  };
})(jQuery);
