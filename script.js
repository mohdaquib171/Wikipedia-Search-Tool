const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const resultsContainer = document.querySelector(".articles");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchValue = input.value;

  if (!searchValue) {
    resultsContainer.innerHTML = `<h2>Please enter a valid search</h2>`;
  }
  fetchWikipediaData(searchValue);
});

// fetch search results
async function fetchWikipediaData(searchValue) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=${searchValue}`;

  try {
    const response = await fetch(url);
    //   console.log(response);

    const data = await response.json();
    // console.log(data);

    const results = data.query.search;
    // console.log(displayResults);

    if (displayResults.length < 1) {
      resultsContainer.innerHTML = `<h2>No match, try again</h2>`;
      return;
    }

    displayResults(results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// dispaly search results
function displayResults(searchResult) {
  resultsContainer.innerHTML = "";

  searchResult.forEach((element) => {
    // console.log(element);
    const resultItem = document.createElement("a");
    resultItem.href = `https://en.wikipedia.org/wiki/${element.title}`;
    resultItem.target = "_blank";
    resultItem.innerHTML = `<h4>${element.title}</h4><p>${element.snippet}</p>`;

    // Append result
    resultsContainer.appendChild(resultItem);
  });
}
