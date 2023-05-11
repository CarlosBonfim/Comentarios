const url = "http://localhost:3000/posts";

//funcao que recebe o envio do form e manda pra api
function submitClick() {
  const forms = document.getElementsByClassName("formContent");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
      let formData = new FormData(forms[i]);
      let data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      e.preventDefault();

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(backPosts)
        .then(() => {
          location.reload();
        })
        .catch((err) => console.log(`Houve um erro: ${err}`));
    });
  }
}
//funcao que exibe o form de edicao
function editPost(element) {
  let id = element.dataset.id;
  fetch(url + `/${id}`)
    .then((response) => response.json())
    .then((data) => data[0])
    .then((values) => {
      const postForm = document.createElement("div");
      postForm.classList.add("formPost");
      postForm.innerHTML = `<form class="formContent">
      <input type="hidden" name="id" value="${values.id}" >
      <label for="author" class="authorPost">Autor</label><br>
      <input type="text" class="authorPost" placeholder="${values.autor}" maxlength="10" name="autor" readonly><br>
      <label for="text " class="textPost">Sua mensagem</label><br>
      <textarea class="textPost" placeholder="" name="texto" maxlength="120">${values.texto}</textarea><br><br>
      <input type="submit" id="submitButton" value="Enviar" onclick="submitEditClick()">
      </form>`;
      main.appendChild(postForm);
    });
}

//funcao que recebe o envio do form edit para api
function submitEditClick() {
  const forms = document.getElementsByClassName("formContent");
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
      let formData = new FormData(forms[i]);
      let data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      e.preventDefault();

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(backPosts)
        .then(() => {
          location.reload();
        })
        .catch((err) => console.log(`Houve um erro: ${err}`));
    });
  }
}

//funcao delete
function deleteClick(element) {
  let id = element.dataset.id;
  if (confirm("Você quer realmente apagar isso ?")) {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(`Houve um erro: ${err}`));
  }
}

//fetch que busca e exibe os dados na home
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dataElement = document.getElementsByClassName("posts");
    data.forEach((element) => {
      const postContent = document.createElement("div");
      postContent.classList.add("post_content");
      postContent.innerHTML = `<h3 class="author_post">${element.autor}</h3><p class="post_text">${element.texto}</p><div class="post_buttons">
      <i class="fa-sharp fa-solid fa-trash trash" onclick="deleteClick(this)" data-id="${element.id}"></i>	
      <i class="fa-solid fa-pen-to-square" onclick="showForm('put', this)" data-id="${element.id}"></i>
    </div>`;
      for (let dataElements of dataElement) {
        dataElements.appendChild(postContent.cloneNode(true));
      }
    });
  })
  .catch((err) => console.log(`Caiu no catch: ${err}`));
