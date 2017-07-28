// Listen for a form submission
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e) {
  //Get values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteUrl').value;

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

  //Prevent default action
  e.preventDefault();
}
