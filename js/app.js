'use strict';

const templateId = '#photo-template';
let templateHtml = $(templateId).html();

let picObject = {
  title: '',
  image_url: '',
  description: '',
  keyword: '',
  horns:'',
};

let html = Mustache.render(templateHtml, picObject);

$('#picsId').append(html);
// const pics = [];
const keywords = [];
// let horns = [];

function Pic(data) {
  for(let key in data) {
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

let imgs = null;
$.ajax('data/page-1.json', ajaxSettings).then(function(data) {
  imgs = data;
  imgs.forEach(picData => {
    let pic = new Pic(picData);
    console.log(pic);
    $('#picsId').append(pic.toHtml());
  });
  imgs.forEach(pic => filterPics(pic));

});



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



function renderElement(filter) {
  $('#picId').empty();
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

