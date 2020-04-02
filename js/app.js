'use strict';

// $(document).load(function () {
//   $('div:first-of-type').addClass('first');
// });

const templateId = '#photo-template';
let templateHtml = $(templateId).html();
const keywords = [];


function Pic(data) {
  for (let key in data) {
    console.log(key);
    this[key] = data[key];
  }
  // pics.push(this);
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

function firstPage() {
  pageOne.forEach(picData => {
    let pic = new Pic(picData);
    console.log(pic);
    $('#picsId').append(pic.toHtml());
  });
  pageOne.forEach(pic => filterPics(pic));
}

function secondPage() {
  pageTwo.forEach(picData => {
    let pic = new Pic(picData);
    console.log(pic);
    $('#picsId').append(pic.toHtml());
  });
  pageTwo.forEach(pic => filterPics(pic));
}

// automatically set as null
let pageOne;

$.ajax('data/page-1.json', ajaxSettings).then(function (data) {
  pageOne = data;
  firstPage();
});

let pageTwo;
$.ajax('data/page-2.json', ajaxSettings).then(function(data) {
  pageTwo = data;
  secondPage();
});
// on click clear and then call secondPage()

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



function renderElement(filter) {
  $('section').empty();
  pageOne.forEach((pic) => {
    let displayPic = new Pic(pic);
    if (displayPic.keyword === filter) {
      $('#picsId').append(displayPic.toHtml());
    } else if (filter === 'default') {
      $('#picsId').append(displayPic.toHtml());
    }
  });
}

$('.filter').on('change', function () {
  let $this = $(this),
    filterValue = $this.val();

  renderElement(filterValue);
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
  console.log('sorting!');

  pageOne.sort(sortAlphabetical);
  console.log(pageOne);

  var filterValue = $('.filter').val();
  renderElement(filterValue);
}

$('#sort').on('click', sortPage);
