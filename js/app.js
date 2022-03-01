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
const loadMobileData = async (searchText = "a") => {
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
      notFoundMsg.innerText = `We Couldn't find any matches for "${searchText}"`;
      notFound.classList.remove("d-none");
    }
  } catch (error) {
    console.log(error);
  }
};
loadMobileData();
// display search result in card
const displaySearchResult = (dataArray) => {
  const cardsContainer = document.getElementById("cards-container");
  // clear cards
  clear("cards-container");
  clear("details-card");

  //  obj's array loop
  for (const element of dataArray) {
    // check card Number
    if (dataArray.indexOf(element) == 20) {
      break;
    }

    const imageUrl = element.image;
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
  }
};

// show phone details
const seeDetails = async (phoneId) => {
  const phoneUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  const res = await fetch(phoneUrl);
  const data = await res.json();
  detailsCard(data.data);
};

// show phone details in details Card
const detailsCard = (phone) => {
  let releaseDate = phone.releaseDate;

  // check phone release datae available or not
  if (!phone.releaseDate) {
    releaseDate = "No Release Date Found!";
  }
  // concat all sensors name by ,
  const sensors = phone.mainFeatures.sensors.join(", ");
  const card = document.getElementById("details-card");
  clear("details-card");
  const div = document.createElement("div");

  // adding phone details in details card
  div.innerHTML = `
  <div class="card" style="width: 23rem">
      <img
        src="${phone.image}"
        class="card-img-top"
        alt="${phone.name}"
      />
      <div id="details-card-body" class="card-body">              
          <h4 class="card-title">${phone.name}</h4>
          <br />
          <p>${releaseDate}</p>
          <hr />
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
          <br />
          <p>Others</p>
          <hr />
          <table id="others-table" class="table">      
          </table>
      </div>
  </div>
`;
  card.appendChild(div);

  const othersTable = document.getElementById("others-table");
  const othersTbody = document.createElement("tbody");

  // check others info available or not
  if (phone.others) {
    // adding phone others info in othersTable
    othersTable.innerHTML = `    
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
    `;
    othersTable.appendChild(othersTbody);
  } else {
    // clear othersTable
    othersTbody.innerHTML = ``;
    othersTbody.innerHTML = `
    <td>No others data available.</td>
    `;
    othersTable.appendChild(othersTbody);
  }
};
