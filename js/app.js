// clear Search Box
const clearSearchBox = () => {
  const searchFeild = document.getElementById("search-box");
  searchFeild.value = "";
};

// search button function
const searchBtn = () => {
  const searchValue = document.getElementById("search-box").value;
  console.log(searchValue);
};
