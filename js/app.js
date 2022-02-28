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
    displaySearchResult(data.data);
  } catch (error) {
    console.log(error);
  }
};
// X SHOULD BE REMOVED
loadMobileData("iphone");

// display search result in card
const displaySearchResult = (dataArray) => {
  const cardsContainer = document.getElementById("cards-container");
  // clear cards
  cardsContainer.innerHTML = ``;
  dataArray.forEach((element) => {
    const imageUrl = element.image;

    const div = document.createElement("div");
    div.classList.add("col");
    // <div class="col">
    div.innerHTML = `
    <div class="card h-100">
        <img src="${imageUrl}" class="card-img-top" alt="${element.phone_name}" />
        <div class="card-body">
            <h5 class="card-title">${element.phone_name}</h5>
            <h6 class="fs-6">Brand: ${element.brand}<h6>
        </div>    
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">See Details</button>
        </div>
    </div>
    `;
    //   </div>
    cardsContainer.appendChild(div);
  });
};
