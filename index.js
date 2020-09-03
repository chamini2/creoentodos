// navigator.serviceWorker.register('service-worker.js');

const queryParams = new URLSearchParams(window.location.search)

function clss$(clss) {
  return $(`.${clss}`);
}

function id$(id) {
  return $(`#${id}`);
}

$(document).ready(function() {
  if (queryParams.get('authors') != null) {
    id$('authors').show()
  } else {
    id$('authors').hide()
  }
});
