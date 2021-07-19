(function () {
  var xhttp;

  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
  } else {
    // code for old IE browsers
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // checking status of the file once ready converting data to json
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const jsonData = JSON.parse(this.responseText);
      createElements(jsonData);
      scrollDisplay();
      lazyImg();
      indexCard();
      displayModal();
    }
  };

  xhttp.open("GET", "../data/MOCK_DATA.json", true);
  xhttp.send();
})();

function createElements(data) {
  // Grab the template script
  var theTemplateScript = document.getElementById("article__template").innerHTML;

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // data goes here in context object
  const context = {
    data,
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  document.querySelector(".article__grid").innerHTML = theCompiledHtml;
}

function scrollDisplay() {
  // First we select the element we want to target
  const target = document.querySelectorAll(".card");

  // Next we want to create a function that will be called when that element is intersected
  function handleIntersection(entries) {
    // The callback will return an array of entries, even if you are only observing a single item
    entries.map((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("d-block");
      } else {
        entry.target.classList.remove("d-block");
      }
    });
  }

  // Next we instantiate the observer with the function we created above. This takes an optional configuration
  // object that we will use in the other examples.
  const observer = new IntersectionObserver(handleIntersection);

  // Finally start observing the target element
  // observer.observe(target);
  target.forEach((tar) => observer.observe(tar));
}

function lazyImg() {
  const images = document.querySelectorAll(".card__img");

  function handleIntersection(entries) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.add("loaded");
        // observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);

  images.forEach((image) => observer.observe(image));
}

// Function for indexed card
function indexCard() {
  let cards = document.querySelectorAll(".card");
  cards = Array.from(cards);
  cards.forEach((card) => {
    card.setAttribute("id", cards.indexOf(card));
  });
}

// function for the modal display
function displayModal() {
  // selecting cards, close and share-btn
  const cards = document.querySelectorAll(".card"),
    modalClose = document.querySelectorAll(".modal__close"),
    shareBtn = document.querySelectorAll(".modal__share");

  // Foreach loop of card to display modal onclick
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const modal = card.nextElementSibling;
      modal.classList.toggle("show");
    });
  });

  // Foreach loop of close to hide displayed modal onclick
  modalClose.forEach((close) => {
    close.addEventListener("click", () => {
      const modalContent = close.parentElement;
      const modal = modalContent.parentElement;
      modal.classList.toggle("show");
    });
  });

  // Foreach loop of share btn for share the url using navigator
  shareBtn.forEach((btn) => {
    // first getting current modal all children for title & description getting parent and then get it's children element have taken the card id using traversing two parent element then previous sibling;
    let modalChildren = btn.parentElement.children,
      urlTitle = modalChildren[2],
      urlDesc = modalChildren[3],
      urlLoc = btn.parentElement.parentElement.previousElementSibling.id;

    let shareData = {
      title: urlTitle,
      text: urlDesc,
      url: urlLoc,
    };
    // console.log(shareData);

    btn.addEventListener("click", () => {
      navigator
        .share(shareData)
        .then(() => console.log("Shared Successful"))
        .catch((e) => console.log("Error" + e));
    });
  });
}
