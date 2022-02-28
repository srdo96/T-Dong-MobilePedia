// clear Search Box
const clearSearchBox = () => {
  const searchFeild = document.getElementById("search-box");
  searchFeild.value = "";
};

// search button function
const searchBtn = () => {
  const searchValue = document.getElementById("search-box").value;
  loadMobileData(searchValue);
  //   console.log(searchValue);
};

// fetch data with async
const loadMobileData = async (searchText) => {
  console.log(searchText);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
  } catch (error) {
    console.err(error);
  }
};
