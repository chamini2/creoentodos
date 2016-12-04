function clss$(clss) {
  return $(`.${clss}`);
}

function id$(id) {
  return $(`#${id}`);
}

function changeTab(sw) {
  // Get all elements with class="tabcontent" and hide them
  clss$('content').addClass('hidden');

  // Get all elements with class="tablinks" and remove the class "active"
  clss$('tab').removeClass('active');

  // Show the current tab, and add an "active" class to the link that opened the tab
  id$(`${sw}-tab`).addClass('active');
  id$(sw).removeClass('hidden');
}
