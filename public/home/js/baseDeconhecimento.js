// selectors
const configButtons = document.querySelectorAll(".config");
const modal = document.querySelector(".modal-config");
const modalPost = document.querySelector(".modal-card");
const modalCloseButtonConfig = document.querySelector(".modal-config__close-modal");
const modalCloseButtonCard = document.querySelector(".modal-card__close-modal");
const root = document.querySelector(":root");
const themeToggleButton = document.querySelector(".theme-toggle");
const exitButton = document.querySelector(".exit");
const fontSizes = document.querySelectorAll(".sizes__pick-size span");
const cards = document.querySelector(".cards");
const inputSearch = document.querySelector('.pesquisa__input')
let posts = []
// state

const view = sessionStorage.getItem("theme");
const fontSize = sessionStorage.getItem("fontSize");

// onload
if (view) {
  document.body.classList.toggle("body__darkmode");
  root.style.setProperty(
    "--img-icon__theme",
    'url("../../assets/images/moon.svg")'
  );
  root.style.setProperty(
    "--img-icon__leave",
    'url("../../assets/images/leave-darkmode.svg")'
  );
  root.style.setProperty(
    "--img-icon__close",
    'url("../../assets/images/close.svg")'
  );
  // root.style.setProperty(
  //   "--img-icon__user-card",
  //   'url("url("../../assets/images/user-dark-mode.png")'
  // );
} else {
  root.style.setProperty(
    "--img-icon__theme",
    'url("../../assets/images/sun.svg")'
  );
  root.style.setProperty(
    "--img-icon__leave",
    'url("../../assets/images/leave-lightmode.svg")'
  );
  root.style.setProperty(
    "--img-icon__close",
    'url("../../assets/images/close-lightmode.svg")'
  );
  // root.style.setProperty(
  //   "--img-icon__user-card",
  //   'url("url("../../assets/images/user-light-mode.png")'
  // );
}

const removeActiveClass = () => {
  fontSizes.forEach(function (size) {
    size.classList.remove("active");
  });
};

if (fontSize) {
  document.querySelector("html").style.fontSize = fontSize;
  removeActiveClass();
  if (fontSize == "0.85rem") {
    document.querySelector(".pick-size__small").classList.toggle("active");
  } else if (fontSize == "1rem") {
    document.querySelector(".pick-size__medium").classList.toggle("active");
  } else {
    document.querySelector(".pick-size__large").classList.toggle("active");
  }
}

// handlers
const handleConfigModalState = () => {
  console.log(modalCloseButtonConfig)
  if (modal.style.display == "none") {
    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";
  } else {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
  }
};

handleConfigModalState ()
const handlePostModalState = () => {
  console.log(modalPost)
  if (modalPost.style.display === "none") {
    modalPost.style.display = "flex";
    document.body.style.overflowY = "hidden";
  } else {
    modalPost.style.display = "none";
    document.body.style.overflowY = "visible";
  }
};

handlePostModalState()

const handleUserExit = () => {
  if (
    confirm(
      "Deseja sair da sua conta?\nVocê terá que realizar o login novamente caso saia."
    )
  ) {
    sessionStorage.clear();
    window.location.href = "../../../index.html";
  }
};

const handleThemeToggle = () => {
  document.body.classList.toggle("body__darkmode");
  sessionStorage.setItem("theme", "darkmode");
  if (document.body.classList.contains("body__darkmode")) {
    sessionStorage.setItem("theme", "darkmode");
    root.style.setProperty(
      "--img-icon__theme",
      'url("../../assets/images/moon.svg")'
    );
    root.style.setProperty(
      "--img-icon__leave",
      'url("../../assets/images/leave-darkmode.svg")'
    );
    root.style.setProperty(
      "--img-icon__close",
      'url("../../assets/images/close.svg")'
    );
  } else {
    sessionStorage.removeItem("theme");
    root.style.setProperty(
      "--img-icon__theme",
      'url("../../assets/images/sun.svg")'
    );
    root.style.setProperty(
      "--img-icon__leave",
      'url("../../assets/images/leave-lightmode.svg")'
    );
    root.style.setProperty(
      "--img-icon__close",
      'url("../../assets/images/close-lightmode.svg")'
    );
  }
};

// events
configButtons.forEach(function (button) {
  button.addEventListener("click", handleConfigModalState);
});

modalCloseButtonConfig.addEventListener("click", handleConfigModalState);
modalCloseButtonCard.addEventListener("click", handlePostModalState);

themeToggleButton.addEventListener("click", handleThemeToggle);

exitButton.addEventListener("click", handleUserExit);

fontSizes.forEach(function (size) {
  size.addEventListener("click", () => {
    let fontSizes;
    removeActiveClass();
    size.classList.toggle("active");
    console.log("ENTREI NO FONT SIZE HANDLER ===>" + size);
    if (size.classList.contains("pick-size__small")) {
      fontSizes = "0.85rem";
    } else if (size.classList.contains("pick-size__medium")) {
      fontSizes = "1rem";
    } else {
      fontSizes = "1.4rem";
    }
    sessionStorage.setItem("fontSize", fontSizes);
    document.querySelector("html").style.fontSize = fontSizes;
  });
});






/// FUNÇÕES
function getPosts() {
  fetch('/post/listPosts', {
    method: 'GET',
    "Content-Type": "application/json",
  })
    .then(res => {
      res.json().then(json => {
        posts = json

        console.log(posts)
        posts.forEach(post => {
          cards.innerHTML += `
      <div class="card" id="${post.idPostagem}">
          <div class="card_header">
             <div class="content__tag">
              ${post.tag}
             </div>
             <div class="go-corner">
                <div class="go-arrow">
                →
                </div>
             </div>
          </div>
      <div class="card__content">
        <p class="content_title">${post.titulo}</p>
        <p class="content__description">
            ${post.conteudo}
        </p>
      </div>
      <div class="card__footer">
      <div class="card__image"></div>
      <p>${post.nome}</p>
      </div>
</div>`
        })
      })
    })

}

getPosts()

inputSearch.addEventListener('keyup', event => {
  const filtredPosts = posts.filter(post => post.titulo.toLowerCase().includes(inputSearch.value.toLowerCase()))
  if (filtredPosts.length > 0) {
    cards.innerHTML = ''
    filtredPosts.forEach(post => {
      cards.innerHTML += `
      <div class="card" id="${post.idPostagem}">
          <div class="card_header">
             <div class="content__tag">
              ${post.tag}
             </div>
             <div class="go-corner">
                <div class="go-arrow">
                →
                </div>
             </div>
          </div>
      <div class="card__content">
        <p class="content_title">${post.titulo}</p>
        <p class="content__description">
            ${post.conteudo}
        </p>
      </div>
      <div class="card__footer">
      <div class="card__image"></div>
      <p>${post.nome}</p>
      </div>
</div>`
    })
  }
})

setTimeout(() => {

  const card = document.querySelectorAll(".card");

  card.forEach(card => {
    card.addEventListener('click', () => {
      console.log(card)
      modalPost.innerHTML = `
      <div class="modal-config__close-modal"></div>
        div mascara
        `
      handlePostModalState()
    })
  })
}, 300);

