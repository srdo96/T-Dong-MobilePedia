// clear Search Box
const clearSearchBox = () => {
  const searchFeild = document.getElementById("search-box");
  searchFeild.value = "";
};

// clear cards
const clearCards = () => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = ``;
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

    const notFound = document.getElementById("not-found");
    const body = document.getElementById("body");
    if (data.status == true) {
      clearCards();
      body.classList.remove("bg-warning", "bg-opacity-25");
      notFound.classList.add("d-none");
      displaySearchResult(data.data);
    } else {
      clearCards();

      body.classList.add("bg-warning", "bg-opacity-25");
      const notFoundMsg = document.getElementById("not-Found-msg");
      notFoundMsg.innerText = `We Couldn't find any matches for "${searchText}".`;
      notFound.classList.remove("d-none");
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// display search result in card
const displaySearchResult = (dataArray) => {
  const cardsContainer = document.getElementById("cards-container");
  // clear cards
  clearCards();

  //  obj's array loop
  dataArray.forEach((element) => {
    const imageUrl = element.image;
    // console.log(element.slug);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
        <img src="${imageUrl}" class="card-img-top" alt="${element.phone_name}" />
        <div class="card-body">
            <h5 class="card-title">${element.phone_name}</h5>
            <h6 class="fs-6">Brand: ${element.brand}<h6>
        </div>    
        <div class="d-grid gap-2">
            <button onclick="seeDetails('${element.slug}')" class="btn btn-primary" type="button">See Details</button>
        </div>
    </div>
    `;
    cardsContainer.appendChild(div);
  });
};

// show phone details
const seeDetails = async (phoneId) => {
  const phoneUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  console.log(phoneUrl);
  const res = await fetch(phoneUrl);
  const data = await res.json();
  console.log(data);
  detailsCard(data.data);
};

// show phone details in details Card
const detailsCard = (phone) => {
  // console.log("img", phone.image);
  const card = document.getElementById("details-card");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${phone.image}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
       </div>
     </div>
   </div>
  `;
  card.appendChild(div);
};
