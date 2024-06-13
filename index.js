const apiUrl = "https://www.amiiboapi.com/api/amiibo/";
const characters = [];
const images = [];
let data = [];
let sortDirection = "asc";

const main = document.getElementById("main");
const favs = document.getElementById("favs");

const fetchNintendo = (apiUrl) => {
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((response) => {
      //limits the data
      const limitedData = response.amiibo.slice(0, 30);
      characters.push(...limitedData);
      displayData(characters);

      console.log(characters);

      const charNames = characters.map((character) => {
        return character.name;
      });

      characters.filter((character) => {
        if (character.name === "Peach") {
          images.push(character.image);
        }
      });

      console.log(charNames);
      console.log(images);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
};

fetchNintendo(apiUrl);

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

    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", item.image);
    imageElement.setAttribute("width", "125");
    imageElement.setAttribute("height", "95");
    imageElement.setAttribute("alt", "Character Image");
    itemDiv.appendChild(imageElement);

    const tagDetailDiv = document.createElement("div");
    tagDetailDiv.classList.add("tag-detail");
    itemDiv.appendChild(tagDetailDiv);

    const taglineTitleElement = document.createElement("p");
    taglineTitleElement.textContent = "Release Date: ";

    const taglineElement = document.createElement("p");
    taglineElement.textContent = item.release.na;

    // detailDiv.appendChild(dateTitleElement);
    detailDiv.appendChild(imageElement);
    detailDiv.appendChild(tagDetailDiv);
    tagDetailDiv.appendChild(taglineTitleElement);
    tagDetailDiv.appendChild(taglineElement);
    main.appendChild(itemDiv);
  });
  const countElement = document.getElementById("count");
  countElement.textContent = `Count: ${data.length}`;

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
  characters.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortDirection === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  displayData(characters);
}

const updateCollections = (id, direction) => {
  const item = document.getElementById(id);
  const container = direction === "toFavs" ? favs : main;
  container.appendChild(item);
};

function filterItemsByYear(data, year) {
  const filteredData = data.filter((item) => {
    const releaseDateNA = item.release.na;
    if (releaseDateNA) {
      const releaseYear = parseInt(releaseDateNA.split("-")[0]);
      return releaseYear > year;
    }
  });
  return filteredData;
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  const searchYearInput = document.getElementById("searchYear");
  const yearToSearch = parseInt(searchYearInput.value);

  if (!isNaN(yearToSearch)) {
    const filteredData = filterItemsByYear(characters, yearToSearch);
    displayData(filteredData);
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
  displayData(characters);
});

// const objectArray = [
//   {
//     name: "Jerry Foster",
//     occupation: "Welder",
//     gender: "Male",
//     age: "46",
//   },
//   {
//     name: "Samantha Collins",
//     occupation: "Assembler",
//     gender: "Female",
//     age: "47",
//   },
//   {
//     name: "Sebastian Miller",
//     occupation: "Painter",
//     gender: "Male",
//     age: "32",
//   },
//   {
//     name: "Pamela Brownstone",
//     occupation: "Shipping",
//     gender: "Female",
//     age: "51",
//   },
//   {
//     name: "Matthew VanWyk",
//     occupation: "Machinist",
//     gender: "Male",
//     age: "41",
//   },
//   {
//     name: "Alice Sutherland",
//     occupation: "Office",
//     gender: "Female",
//     age: "26",
//   },
// ];

// console.log(objectArray);

// let data = [];

// const apiUrlD =
//   "https://api.dailymotion.com/videos?channel=sport&limit=10&search=football";

// const fetchApi = (apiUrl) => {
//   return fetch(apiUrl).then((response) => response.json());
// };

// fetchApi(apiUrl)
//   .then((responseData) => {
//     responseData.list.forEach((item) => {
//       console.log(item);
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });
