'use strict';

$(document).ready(function() {
  loadPageOne();
});

const templateId = '#photo-template';
// let templateHtml = $(templateId).html();
const keywords = [];


function Pic(data) {
  for (let key in data) {
    console.log(key);
    this[key] = data[key];
  }
}

Pic.prototype.toHtml = function () {
  let templateHtml = $(templateId).html();
  let html = Mustache.render(templateHtml, this);
  return html;
};

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

let pageData;
function loadPageOne() {
  $.ajax('data/page-1.json', ajaxSettings).then(function (data) {
    pageData = data;
    renderElement();
  });
}
$('#pageOne').on('click', loadPageOne);


function loadPageTwo () {
  $.ajax('data/page-2.json', ajaxSettings).then(function(data) {
    pageData = data;
    renderElement();
  });
}
$('#pageTwo').on('click', loadPageTwo);

function filterPics(pic) {
  let $filter = $('.filter');
  let $makeFilter = $('<option>').addClass('styleFilter');
  $makeFilter.text(pic.keyword);
  $makeFilter.val(pic.keyword);

  if (!keywords.includes(pic.keyword)) {
    keywords.push(pic.keyword);
    $filter.append($makeFilter);
  }
}

function renderElement() {
  const filter = $('.filter').val();

  $('section').empty();
  pageData.forEach((pic) => {
    let displayPic = new Pic(pic);
    if (displayPic.keyword === filter) {
      $('#picsId').append(displayPic.toHtml());
    } else if (filter === 'default') {
      $('#picsId').append(displayPic.toHtml());
    }
    filterPics(displayPic);
  });
}

$('.filter').on('change', function () {
  renderElement();
});

function reloadPage() {
  location.reload(true);
}
$('#clear-filter').on('click', reloadPage);

function sortAlphabetical(a, b) {
  const picTitleA = a.title;
  const picTitleB = b.title;
  let comparison = 0;
  if (picTitleA > picTitleB) {
    comparison = 1;
  } else if (picTitleA < picTitleB) {
    comparison = -1;
  }
  return comparison;
}

function sortPage() {
  pageData.sort(sortAlphabetical);
  renderElement();
}

$('.sort').on('click', sortPage);
