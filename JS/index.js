var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkURL");
var addBookmarkBtn = document.getElementById("Submit");
var bookmarkView = document.getElementById("my-table");
var regexName = /^[a-z]{2,}/gi;
var regexURL =
  /^(http:\/\/|https:\/\/)?(w{3}\.)?[a-zA-Z0-9_]{1,}\.(com|co|net|edu|gov|me|tech|site|mil|eg|bg|tr|ru|uk|ca)/gi;
var bookmarkList = [];

// createing an array to store the bookmarks
if (localStorage.getItem("bookmarks") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  display(bookmarkList);
}

// add bookmarks
function addBookmark() {
  var bookmarks = {
    Name: bookmarkNameInput.value,
    URL: bookmarkUrlInput.value,
  };

  var bookmarkExistsName = bookmarkList.some(function (bookmark) {
    return bookmark.Name === bookmarkNameInput.value;
  });
  var bookmarkExistsURL = bookmarkList.some(function (bookmark) {
    return bookmark.URL === bookmarkUrlInput.value;
  });

  if (bookmarkExistsName && bookmarkExistsURL) {
    alert("(╯°□°）╯︵ ┻━┻ THE BOOKMARK NAME AND URL ALREADY EXISTS!");
    // console.log("the bookmark name and url already exists!");
  } else if (bookmarkExistsName) {
    alert("(╯°□°）╯︵ ┻━┻ THIS BOOKMARK NAME ALREADY EXISTS!");
    bookmarkNameInput.focus();
    // console.log("Name already exists!");
  } else if (bookmarkExistsURL) {
    alert("(╯°□°）╯︵ ┻━┻ THIS BOOKMARK URL ALREADY EXISTS!");
    bookmarkUrlInput.focus();
    // console.log("URL already exists!");
  } else if (bookmarkNameInput.value === "" && bookmarkUrlInput.value === "") {
    alert("(╯°□°）╯︵ ┻━┻ PLEASE FILL OUT THE FORM!");
    // console.log("Please fill out the form!");
  } else if (bookmarkNameInput.value === "") {
    alert("(╯°□°）╯︵ ┻━┻ PLEASE ENTER A NAME!");
    bookmarkNameInput.focus();
    // console.log("Please enter a name!");
  } else if (bookmarkUrlInput.value === "") {
    alert("(╯°□°）╯︵ ┻━┻ PLEASE ENTER A URL!");
    bookmarkUrlInput.focus();
    // console.log("Please enter a URL!");
  } else if (bookmarkNameInput.classList.contains("is-invalid")) {
    alert("(╯°□°）╯︵ ┻━┻ PLEASE ENTER A VALID NAME!");
    bookmarkNameInput.focus();
    // console.log("Please enter a valid name!");
  } else if (bookmarkUrlInput.classList.contains("is-invalid")) {
    alert("(╯°□°）╯︵ ┻━┻ PLEASE ENTER A VALID URL!");
    bookmarkUrlInput.focus();
    // console.log("Please enter a valid URL!");
  } else {
    bookmarkList.push(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    display(bookmarkList);
    clearForm();
    bookmarkUrlInput.classList.remove("is-valid");
    bookmarkNameInput.classList.remove("is-valid");
  }
}

// display bookmarks
function display(View) {
  var bookMarks = "";
  for (var i = 0; i < View.length; i++) {
    bookMarks += `<tr>
        <td class="py-3"><h5 class="fs-6">${i + 1}</h5> </td>
        <td class="py-3"><h5 class="fs-6">${View[i].Name}</h5></td>
        <td class="py-3"> <button onclick="viewBookmark(${i})" class="btn btn-visit fs-6"> <i class="fa-solid fa-eye pe-2"></i> Visit </td>
        <td class="py-3"> <button onclick="deleteBookmark(${i})" class="btn btn-delete fs-6"> <i class="fa-solid fa-trash-can pe-2"></i> Delete</button> </td>
        </tr>`;
  }
  bookmarkView.innerHTML = bookMarks;
  addBookmarkBtn.classList.add("disabled");
}

// clear form
function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
}

// delete bookmarks
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  display(bookmarkList);
}

// visit bookmarks
function viewBookmark(index) {
  if (
    bookmarkList[index].URL.includes("http://") ||
    bookmarkList[index].URL.includes("https://")
  ) {
    open(bookmarkList[index].URL);
  } else {
    open(`https://${bookmarkList[index].URL}`);
  }
}

//validate URL
function validateURL() {
  var urlValue = bookmarkUrlInput.value;
  if (regexURL.test(urlValue) == true) {
    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
  } else if (regexURL.test(urlValue) == false) {
    bookmarkUrlInput.classList.add("is-invalid");
    bookmarkUrlInput.classList.remove("is-valid");
  }
}

//submit button validation
function submitValidation() {
  if (
    bookmarkNameInput.classList.contains("is-valid") &&
    bookmarkUrlInput.classList.contains("is-valid")
  ) {
    addBookmarkBtn.classList.remove("disabled");
  } else if (
    bookmarkNameInput.classList.contains("is-invalid") ||
    bookmarkUrlInput.classList.contains("is-invalid")
  ) {
    addBookmarkBtn.classList.add("disabled");
  }
}

//handle keypress
function handleKeyPress(e) {
  if (e.key === "Enter") {
    addBookmark();
  }
}

//event listeners

//input event listener
bookmarkNameInput.addEventListener("input", validateName);
bookmarkNameInput.addEventListener("input", submitValidation);
bookmarkUrlInput.addEventListener("input", validateURL);
bookmarkUrlInput.addEventListener("input", submitValidation);

//click event listener
addBookmarkBtn.addEventListener("click", addBookmark);

//keypress event listener
bookmarkNameInput.addEventListener("keypress", handleKeyPress);
bookmarkUrlInput.addEventListener("keypress", handleKeyPress);
