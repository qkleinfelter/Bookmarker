// Listen for a form submission
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e) {
  //Get values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteURL)) {
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteURL,
  };

  if (localStorage.getItem('bookmarks') === null) {
    //Init array
    var bookmarks = [];
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Set bookmarks array to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add new bookmark to array
    bookmarks.push(bookmark);
    //Set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  document.getElementById('myForm').reset();
  fetchBookmarks();
  //Prevent default action
  e.preventDefault();
}

function fetchBookmarks() {
  //Gets bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults = document.getElementById('bookmarksResults');
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
      ' <a class="btn btn-danger" href="#" onclick="deleteBookmark(\'' + url + '\')">Delete</a>' +
      '</h3>' +
      '</div>';
  }
}

function deleteBookmark(url) {
  //Get bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

function validateForm(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert('Please fill the form in completely');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
