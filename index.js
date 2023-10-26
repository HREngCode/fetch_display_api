const apiUrl = " https://api.punkapi.com/v2/beers?page=2&per_page=30";
let data = [];
let sortDirection = "asc";

const main = document.getElementById("main");
const favs = document.getElementById("favs");

const fetchItems = (apiUrl) => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((responseData) => {
      data = responseData;
      displayData(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

fetchItems(apiUrl);

const sortButtons = document.querySelectorAll(".sortBtn");

sortButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const direction = e.target.dataset.sort;
    sortNameData(direction);
  });
});

function displayData(data) {
  const itemContainer = document.getElementById("main");
  itemContainer.innerHTML = "";

  data.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.id = index.toString();

    const nameElement = document.createElement("h2");
    nameElement.textContent = item.name;
    itemDiv.appendChild(nameElement);

    const detailDiv = document.createElement("div");
    detailDiv.classList.add("detail");
    itemDiv.appendChild(detailDiv);

    const dateTitleElement = document.createElement("h3");
    dateTitleElement.textContent = "1st Brew: ";
    itemDiv.appendChild(dateTitleElement);

    const dateBrewedElement = document.createElement("h3");
    dateBrewedElement.textContent = item.first_brewed;
    itemDiv.appendChild(dateBrewedElement);

    const tagDetailDiv = document.createElement("div");
    tagDetailDiv.classList.add("tag-detail");
    itemDiv.appendChild(tagDetailDiv);

    const taglineTitleElement = document.createElement("p");
    taglineTitleElement.textContent = "Tagline: ";

    const taglineElement = document.createElement("p");
    taglineElement.textContent = item.tagline;

    detailDiv.appendChild(dateTitleElement);
    detailDiv.appendChild(dateBrewedElement);
    detailDiv.appendChild(tagDetailDiv);
    tagDetailDiv.appendChild(taglineTitleElement);
    tagDetailDiv.appendChild(taglineElement);
    main.appendChild(itemDiv);
  });

  const allItems = document.querySelectorAll(".item");
  allItems.forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.parentElement.id;
      const itemId = parseInt(item.id);
      const direction = parent === "main" ? "toFavs" : "toMain";
      updateCollections(itemId, direction);
    });
  });
}

function sortNameData(sortDirection) {
  data.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortDirection === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  displayData(data);
}

const updateCollections = (id, direction) => {
  const item = document.getElementById(id);
  const container = direction === "toFavs" ? favs : main;
  container.appendChild(item);
};

function filterItemsByYear(data, year) {
  const filteredData = data.filter((item) => {
    const firstBrewedYear = parseInt(item.first_brewed.split("/")[1]);
    return firstBrewedYear > year;
  });
  return filteredData;
}
function displayFilteredData(filteredData) {
  const itemContainer = document.getElementById("main");
  const countElement = document.getElementById("count");
  itemContainer.innerHTML = "";

  countElement.textContent = `Count: ${filteredData.length}`;

  filteredData.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const nameElement = document.createElement("h2");
    nameElement.textContent = item.name;
    itemDiv.appendChild(nameElement);

    itemContainer.appendChild(itemDiv);
  });
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const searchYearInput = document.getElementById("searchYear");
  const yearToSearch = parseInt(searchYearInput.value);

  if (!isNaN(yearToSearch)) {
    const filteredData = filterItemsByYear(data, yearToSearch);
    displayFilteredData(filteredData);
  } else {
    alert("Please enter a valid year.");
  }
});

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => {
  const searchYearInput = document.getElementById("searchYear");
  searchYearInput.value = "";

  const countElement = document.getElementById("count");
  countElement.textContent = "Count: 0";
  displayData(data);
});
