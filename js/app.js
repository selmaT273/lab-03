'use strict';

const pics = [];
const keywords = [];
// let horns = [];

function Pic(pic) {
  this.image_url = pic.image_url;
  this.title = pic.title;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;
  pics.push(this);
}

Pic.prototype.render = function (container) {
  let $container = $(container);
  let $template = $('#photo-template');
  let $pic = $template.clone();
  $pic.removeAttr('id');
  $pic.find('h2.pic-name').text(this.title);
  $pic.find('img.pic-display').attr('src', this.image_url);
  $pic.find('p').text(this.description);
  $container.append($pic);
};

function filterPics(pic){
  let $filter = $('.filter');
  let $makeFilter = $('<option>').addClass('styleFilter');
  $makeFilter.text(pic.keyword);
  $makeFilter.val(pic.keyword);

  if (!keywords.includes(pic.keyword)) {
    keywords.push(pic.keyword);
    $filter.append($makeFilter);
  }
}
const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

let imgs = null;
$.ajax('data/page-1.json', ajaxSettings).then(function(data) {
  imgs = data;
  renderElement('default');
  imgs.forEach(pic => filterPics(pic));

});

function renderElement(filter) {
  $('main').empty();
  imgs.forEach((pic) => {
    let displayPic = new Pic(pic);
    if (displayPic.keyword === filter) {
      displayPic.render('main');
    } else if (filter === 'default') {
      displayPic.render('main');
    }
  });
}

$('.filter').on('change', function() {
  let $this = $(this),
    filterValue = $this.val();

  renderElement(filterValue);
});

function reloadPage(){
  location.reload(true);
}

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
