const newPostButton = document.getElementsByClassName("newPostButton");
const main = document.getElementsByClassName("main")[0];
const content = document.getElementsByClassName("content")[0];
const arrowBack = document.getElementById("backToMain");

//funcao que exibe o formuladrio determinado
function showForm(typeRequest, element) {
  content.style.display = "none";
  arrowBack.style.display = "block";
  if (typeRequest === "post") {
    renderPostForm();
  } else if (typeRequest === "put") {
    editPost(element);
  }
}

//funcao que exibe o formulario de criacao de post
function renderPostForm() {
  const postForm = document.createElement("div");
  postForm.classList.add("formPost");
  postForm.innerHTML = `<form class="formContent">
    <label for="author" class="authorPost">Autor</label><br>
    <input type="text" class="authorPost" maxlength="10" name="autor"><br>
    <label for="text " class="textPost">Sua mensagem</label><br>
    <textarea class="textPost" maxlength="120" name="texto"></textarea><br><br>
    <input type="submit" id="submitButton" value="Enviar" onclick="submitClick()">
    </form>`;
  main.appendChild(postForm);
}

//funcao que fecha o form e volta a exibir os dados
function backPosts() {
  const postForm = document.getElementsByClassName("formPost")[0];
  postForm.parentNode.removeChild(postForm);
  content.style.display = "block";
  arrowBack.style.display = "none";
}
