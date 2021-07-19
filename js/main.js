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
      shareBtn();
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
    modalClose = document.querySelectorAll(".modal__close");

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
}

// Function shareBtn
function shareBtn() {
  const shareBtn = document.querySelectorAll(".modal__share");
  let shareFb = (link, text) => {
    return `
      <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhandlebar-blog-sunil-chau.netlify.app%2F%23${link}" target="_blank" rel="noopener" aria-label="Facebook">
        <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"></path></svg></div>Facebook</div>
      </a>
    `;
  };
  let shareTwitter = (link, text) => {
    return `
      <a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=${text}&amp;url=https%3A%2F%2Fhandlebar-blog-sunil-chau.netlify.app%2F%23${link}" target="_blank" rel="noopener" aria-label="Twitter">
        <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
            d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"
          ></path></svg></div>Twitter</div>
      </a>
    `;
  };
  let shareEmail = (link, text) => {
    return `
      <a class="resp-sharing-button__link" href="mailto:?subject=${text}&amp;body=https%3A%2F%2Fhandlebar-blog-sunil-chau.netlify.app%2F%23${link}" target="_self" rel="noopener" aria-label="E-Mail">
        <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
            d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"
          ></path></svg></div>E-Mail</div>
      </a>
    `;
  };
  let shareLinkedin = (link, text) => {
    return `
      <a class="resp-sharing-button__link" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fhandlebar-blog-sunil-chau.netlify.app%2F%23${link}&amp;title=${text}&amp;summary=${text}&amp;source=https%3A%2F%2Fhandlebar-blog-sunil-chau.netlify.app%2F%23${link}" target="_blank" rel="noopener" aria-label="LinkedIn">
        <div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"></path></svg></div>LinkedIn</div>
      </a>
    `;
  };
  let shareWhatsapp = (link, text) => {
    return `
      <a class="resp-sharing-button__link" href="whatsapp://send?text=${text}%20https%3A%2F%2Fhandlebar-blog-sunil-chau.netlify.app%2F%23${link}" target="_blank" rel="noopener" aria-label="WhatsApp">
        <div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
            d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"
          ></path></svg></div>WhatsApp</div>
      </a>
    `;
  };
  let shareTelegram = (link, text) => {
    return `
      <a class="resp-sharing-button__link" href="https://telegram.me/share/url?text=${text}&amp;url=https%3A%2F%2Fhandlebar-blog-sunil-chau.netlify.app%2F%23${link}" target="_blank" rel="noopener" aria-label="Telegram">
        <div class="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z"></path></svg></div>Telegram</div>
      </a>
    `;
  };

  // Foreach loop of share btn for share the url using navigator
  shareBtn.forEach((share) => {
    // first getting current modal all children for title & description getting parent and then get it's children element have taken the card id using traversing two parent element then previous sibling;
    let modalChildren = share.parentElement.children,
      urlTitle = modalChildren[2].innerHTML,
      urlLoc = share.parentElement.parentElement.previousElementSibling.id;

    let shareData = {
      title: urlTitle,
      url: urlLoc,
    };

    // console.log(shareData);

    const mainshareFb = shareFb(shareData.url, shareData.title);
    const mainshareTwitter = shareTwitter(shareData.url, shareData.title);
    const mainshareEmail = shareEmail(shareData.url, shareData.title);
    const mainshareLinkedin = shareLinkedin(shareData.url, shareData.title);
    const mainshareWhatsapp = shareWhatsapp(shareData.url, shareData.title);
    const mainshareTelegram = shareTelegram(shareData.url, shareData.title);
    share.innerHTML = mainshareFb + mainshareTwitter + mainshareEmail + mainshareLinkedin + mainshareWhatsapp + mainshareTelegram;
  });
}
