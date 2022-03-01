// clear Search Box
const clearSearchBox = () => {
  const searchFeild = document.getElementById("search-box");
  searchFeild.value = "";
};

// clear cards
const clear = (id) => {
  const cardsContainer = document.getElementById(id);
  cardsContainer.innerHTML = ``;
};

// search button function
const searchBtn = () => {
  const searchValue = document.getElementById("search-box").value;
  loadMobileData(searchValue);
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
      clear("cards-container");
      body.classList.remove("bg-warning", "bg-opacity-25");
      notFound.classList.add("d-none");
      displaySearchResult(data.data);
    } else {
      clear("details-card");
      clear("cards-container");

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
  console.log(dataArray);
  const cardsContainer = document.getElementById("cards-container");
  // clear cards
  clear("cards-container");
  clear("details-card");
  /* const card = document.getElementById("details-card");
  card.innerHTML = ""; */

  //  obj's array loop
  for (const element of dataArray) {
    console.log(dataArray.indexOf(element));
    // check card Number
    if (dataArray.indexOf(element) == 20) {
      break;
    }

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
            
            <a onclick="seeDetails('${element.slug}')" class="btn btn-primary" href="#details-card" role="button">See Details</a>
        </div>
    </div>
    `;
    cardsContainer.appendChild(div);
    // });
  }
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
  // console.log("dfs", phone.others);
  let releaseDate = phone.releaseDate;
  if (!phone.releaseDate) {
    releaseDate = "No Release Date Found!";
  }
  const sensors = phone.mainFeatures.sensors.join(", ");
  console.log("sen", sensors);
  const card = document.getElementById("details-card");
  // card.innerHTML = "";
  clear("details-card");
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="card" style="width: 25rem">
  <img
    src="${phone.image}"
    class="card-img-top w-75"
    alt="${phone.name}"
  />
  <div id="details-card-body" class="card-body">
              <h5 class="card-title">${phone.name}</h5>
              <br />
              <p>Release</p>
              <hr />
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Release Date</th>
                    <td>${releaseDate}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <p>Main Features</p>
              <hr />
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Storage</th>
                    <td>${phone.mainFeatures.storage}</td>
                  </tr>
                  <tr>
                    <th scope="row">Display Size</th>
                    <td>${phone.mainFeatures.displaySize}</td>
                  </tr>
                  <tr>
                    <th scope="row">Chipset</th>
                    <td>${phone.mainFeatures.chipSet}</td>
                  </tr>
                  <tr>
                    <th scope="row">Memory</th>
                    <td>${phone.mainFeatures.memory}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <p>Sensors</p>
              <hr />
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Sensors</th>
                    <td>${sensors}</td>
                  </tr>
                </tbody>
              </table>
            </div>
</div>
  `;
  card.appendChild(div);
  const detailsCardBody = document.getElementById("details-card-body");
  const otherDiv = document.createElement("div");
  if (phone.others) {
    otherDiv.innerHTML = `
    <br />
    <p>Others</p>
    <hr />
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">WLAN</th>
          <td>${phone.others.WLAN}</td>
        </tr>
        <tr>
          <th scope="row">Bluetooth</th>
          <td>${phone.others.Bluetooth}</td>
        </tr>
        <tr>
          <th scope="row">GPS</th>
          <td>${phone.others.GPS}</td>
        </tr>
        <tr>
          <th scope="row">NFC</th>
          <td>${phone.others.NFC}</td>
        </tr>
        <tr>
          <th scope="row">Radio</th>
          <td>${phone.others.Radio}</td>
        </tr>
        <tr>
          <th scope="row">USB</th>
          <td>${phone.others.USB}</td>
        </tr>
      </tbody>
    </table>
    `;
    detailsCardBody.appendChild(otherDiv);
  } else {
    console.log("else", phone.others);
    otherDiv.innerHTML = ``;
  }
};
