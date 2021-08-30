const BASE_URL = "https://api.harvardartmuseums.org";
const KEY = "apikey=3231f1f0-660f-4310-8cbb-c441da02f79f"; // USE YOUR KEY HERE

async function fetchObjects() {
  const url = `${BASE_URL}/object?${KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

fetchObjects().then((x) => console.log(x));

async function fetchAllCenturies() {
  const url = `${BASE_URL}/century?${KEY}&size=100&sort=temporalorder`;

  if (localStorage.getItem("centuries")) {
    return JSON.parse(localStorage.getItem("centuries"));
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    const records = data.records;
    localStorage.setItem("centuries", JSON.stringify(records));
    return records;
  } catch (err) {
    console.error(err);
  }
}

async function fetchAllClassifications() {
  const url = `${BASE_URL}/classification?${KEY}&size=100&sort=name`;
  if (localStorage.getItem("classifications")) {
    return JSON.parse(localStorage.getItem("classifications"));
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    const records = data.records;
    localStorage.setItem("classifications", JSON.stringify(records));
    return records;
  } catch (err) {
    console.error(err);
  }
}

async function prefetchCategoryLists() {
  try {
    const [classifications, centuries] = await Promise.all([
      fetchAllClassifications(),
      fetchAllCenturies(),
    ]);

    $(".classification-count").text(`(${classifications.length})`);

    classifications.forEach((classification) => {
      // append a correctly formatted option tag into
      // the element with id select-classification

      $("#select-classification").append(
        `<option value="${classification.name}">${classification.name}</option>`
      );
    });

    $(".century-count").text(`(${centuries.length})`);

    centuries.forEach((century) => {
      // append a correctly formatted option tag into
      // the element with id select-century
      $("#select-century").append(
        `<option value="${century.name}">${century.name}</option>`
      );
    });
  } catch (error) {
    console.error(error);
  }
}
prefetchCategoryLists();

function buildSearchString() {
  let classification = $("#select-classification").val();
  let century = $("#select-century").val();
  let keyword = $("#keywords").val();

  return `${BASE_URL}/object?${KEY}&classification=${classification}&century=${century}&keyword=${keyword}`;
}

function onFetchStart() {
  $("#loading").addClass("active");
}

function onFetchEnd() {
  $("#loading").removeClass("active");
}

$("#search").on("submit", async function (event) {
  // prevent the default
  event.preventDefault();
  onFetchStart();

  try {
    // get the url from `buildSearchString`
    let url = buildSearchString();
    const encodedUrl = encodeURI(url);
    const response = await fetch(encodedUrl);
    // fetch it with await, store the result
    const { info, records } = await response.json();
    // log out both info and records when you get them

    updatePreview(records, info);
  } catch (error) {
    console.error(error);
    // log out the error
  } finally {
    onFetchEnd();
  }
});

//Module 2

function renderPreview(record) {
  const { description, title, primaryimageurl } = record;

  let element = $(`<div class="object-preview">
  <a href="#">
    <img src="${
      primaryimageurl ? primaryimageurl : ""
    }" alt="Beep Boop: Image not Found" />
    <h3>${title ? title : " Beep boop Title Not Found"}</h3>
    <h3>${description ? description : "Beep boop Description Not Found"}</h3>
  </a>
</div>`).data("record", record);

  return element;
}

function updatePreview(records, info) {
  const root = $("#preview");

  if (info.next) {
    $(".pagination .next").prop("disabled", false);
    $(".next").data("url", info.next);
  } else {
    $(".pagination .next").prop("disabled", true);
    $(".next").data("url", null);
  }

  if (info.prev) {
    $(".pagination .previous").prop("disabled", false);
    $(".previous").data("url", info.previous);
  } else {
    $(".pagination .previous").prop("disabled", true);
    $(".previous").data("url", null);
  }
  // grab the results element, it matches .results inside root
  // empty it
  const results = root.find(".results");
  results.empty();
  $(".results").empty();
  // loop over the records, and append the renderPreview
  records.forEach((el) => {
    results.append(renderPreview(el));
  });
}

$("#preview .next, #preview .previous").on("click", async function () {
  /*
    read off url from the target 
    fetch the url
    read the records and info from the response.json()
    update the preview
  */
  onFetchStart();
  try {
    const newUrl = $(this).data("url");
    const response = await fetch(newUrl);
    const { info, records } = await response.json();

    updatePreview(records, info);
  } catch (err) {
    console.error(err);
  } finally {
    onFetchEnd();
  }
});

$("#preview").on("click", ".object-preview", function (event) {
  event.preventDefault(); // they're anchor tags, so don't follow the link
  // find the '.object-preview' element by using .closest() from the target
  const obj = $(this).closest(".object-preview");
  // recover the record from the element using the .data('record') we attached

  const record = obj.data("record");
  // log out the record object to see the shape of the data
  console.log(record);
  $("#feature").html(renderFeature(record));
});

function renderFeature(record) {
  const {
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline,
    images,
    primaryimageurl,
  } = record;

  return $(`<div class="object-feature">
  <header>
    <h3>${record.title}</h3>
    <h4>${record.dated}</h4>
  </header>
  <section class="facts">
  ${factHTML("Description", description)} 
  ${factHTML("Culture", culture)} 
  ${factHTML("Style", style)}
   ${factHTML("Technique", technique)} 
  ${factHTML("Medium", medium)} 
  ${factHTML("Dimensions", dimensions)} 
  ${
    people
      ? people
          .map(function (person) {
            return factHTML("Person", person.displayname, "person");
          })
          .join("")
      : ""
  } 
  ${factHTML("Department", department)} 
  ${factHTML("Division", division)} 
  ${factHTML(
    "Contact",
    `<a target="_blank" href="mailto:${contact}">${contact}</a>`
  )} 
  ${factHTML("Credit", creditline)} 
  </section>
  <section class="photos">
  ${photosHTML(images, primaryimageurl)}
  </section>`);
}

function searchURL(searchType, searchString) {
  return `${BASE_URL}/object?${KEY}&${searchType}=${searchString}`;
}

function factHTML(title, content, searchTerm = null) {
  if (!content) {
    return "";
  } else if (!searchTerm) {
    return ` <span class="title">${title}</span>
    <span class="content">${content}</span>`;
  } else {
    ` <span class="title">${title}</span>
    <span class="content"><a href="WELL_FORMED_URL">${searchURL(
      searchTerm,
      content
    )}</a></span>`;
  }
}
function photosHTML(images, primaryimageurl) {
  if (images && images.length > 0) {
    const imgArray = images.map(function (image) {
      return `<img src="${image.baseimageurl}" />`;
    });
    return imgArray.join();
  } else if (primaryimageurl) {
    return `<img src="${primaryimageurl}" />`;
  } else {
    return "";
  }
}
