
var URL = window.URL || window.webkitURL;
let buttonadd = document.getElementById("btnmore")
let buttonless = document.getElementById("btnless")
let buttonOk = document.getElementById("ok");
let buttonStart = document.getElementById("start");
let buttontrouve = document.getElementById("trouve");
let buttonenvoie = document.getElementById("envoie");
let buttonokgo = document.getElementById("okgo");
let buttonDebeug = document.getElementById("debeug");
let buttonNon = document.getElementById("non");
let creataccount = document.getElementById("creataccount");
let monProfil = document.getElementById("monProfil");
let rechercher = document.getElementById("rechercher");
let popUp = document.getElementById("popUpphoto");
let ouvrirButton = document.getElementById("ouvrirButton");
let nonPasMoi = document.getElementById("nonPasMoi");
let ouiCMoi = document.getElementById("ouiCMoi");
let imgData;
let buttonClose = document.getElementById("close-button")
let goprofil = document.getElementById("bottomCard")
let myname;
let buttonBack = document.getElementById("back");
let buttonBackChercheur = document.getElementById("backchercheur");
let bouttonSuivantbravo = document.getElementById("suivantbravo")
let bouttonSuivantTolate = document.getElementById("suivanttoLate")
let retourchercher = document.getElementById("retourchercher")
let gorecherche = document.getElementById("gorecherche");
let chercherStart = document.getElementById("chercherStart")
let exit = false;

let output = document.getElementById("output")
let number
let counter = 0;
let value = 0;
let backgroundColor = document.querySelectorAll('.bg-color');

let propositionId = null;

let targetData = null;

let partie = false;

let start = false;

let nextPage = 13;

const MAX_PAGE = 15;

function displayPage(num_page, callback) {
  window.sessionStorage.setItem("currentPage", num_page)

  for (let i = 1; i <= 15; ++i) {
    document.getElementById(`page${i}`).style.display = i == num_page ? 'block' : 'none';
  }
  if (callback)
    callback()

}
if (!window.sessionStorage.getItem("currentPage")) {
  window.sessionStorage.setItem("currentPage", 1)
}
// displayPage(window.sessionStorage.getItem("currentPage"))

buttonOk.onclick = () => {

  displayPage(2);
  (async () => {
    target = await getTarget();
    if (target) {
      const nomProfil = document.getElementById("pseudo1")
      myname = target.name
      const imgProfil = document.getElementById("targetImg1")
      imgProfil.src = names[myname].src
      nomProfil.innerText = names[myname].name
    }

  })();
}

let target = null;

buttonStart.onclick = async () => {
  console.log(target);

  if (target) {
    displayPage(12)

  } else {
    displayPage(6)

  }
}

chercherStart.onclick = () => {

  if (target.id == window.sessionStorage.getItem("id")) {
    const description = document.getElementById("description")
    let s = "";
    const pseudo = document.getElementById("pseudo");
    Object.keys(target).forEach((key) => {
      if (key != "name" && key != "id")
        s += "<p>" + target[key] + "</p>"
    })
    description.innerHTML = s;
    pseudo.innerText = names[target["name"]].name;
    const targetImg = document.getElementById("targetImg")
    targetImg.src = names[target.name].src
    // if(targ)
    displayPage(nextPage)
    buttontrouve.style.display = "none"
  } else {
    cToiPopUp.style.display = "none";

    const description = document.getElementById("description")
    let s = "";
    const pseudo = document.getElementById("pseudo");
    Object.keys(target).forEach((key) => {
      if (key != "name" && key != "id")
        s += "<p>" + target[key] + "</p>"
    })
    description.innerHTML = s;
    pseudo.innerText = names[target["name"]].name;
    const targetImg = document.getElementById("targetImg")
    targetImg.src = names[target.name].src
  }
  displayPage(3)
}
const closeButton = document.getElementById("close-button");
const cToiPopUp = document.getElementById("cToiPopUp");

closeButton.addEventListener("click", function () {
  if (cToiPopUp.style.display === 'none') {
    cToiPopUp.style.display = 'block';
    cToiPopUp.style.transform = 'translateY(0)';
  } else {
    cToiPopUp.style.transform = 'translateY(-100%)';
    cToiPopUp.style.display = 'none';
    listenTrouverTarget(async (Cid) => {
      const url = await downloadImage(Cid)
      nonPasMoi.onclick = () => {
        notFound();
        displayPage(3)
      }
      ouiCMoi.onclick = () => {
        found(Cid);
        displayPage(15)
      }
      console.log(url);
      buttontrouve.style.display = "none"
      popUp.style.display = "block"

      ouvrirButton.onclick = () => {
        const imgRecu = document.getElementById("imgRecu");
        imgRecu.src = url;
        displayPage(11);
      }
    })
  }
});


buttontrouve.onclick = () => {
  displayPage(4)

  capture()
}

function capture() {
  // let imgData;
  document.getElementById("screnshot").onclick = function () {
    let cameraInput = document.getElementById("cameraInput");
    let preview = document.getElementById("preview");

    cameraInput.onchange = function (event) {

      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (event) {
        imgData = new Blob([event.target.result], { type: file.type })
        console.log(imgData);
        preview.src = URL.createObjectURL(imgData);
        // imgData = event.target.result;
        preview.style.display = "block";
        var previewContainer = document.getElementById("previewContainer");
        previewContainer.appendChild(preview);

      };

      // reader.readAsDataURL(file);
      reader.readAsArrayBuffer(file)

    };
    cameraInput.click();
  };
  // handle the image data 
  var img = new Image();
  img.src = imgData;
  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var imgAsDataURL = canvas.toDataURL("image/jpeg");
    var link = document.createElement("a");
    link.download = "/img/trouver.jpg";
    link.href = imgAsDataURL;
    link.click();
  };
}


buttonenvoie.onclick = () => {
  if (imgData) {
    displayPage(5)
    uploadImage(imgData, window.sessionStorage.getItem("id"), () => {
      imgData == null;
      listenFound((exists) => {

        console.log(vals);
        if (!exists) {
          displayPage(8)
          const page8 = document.getElementById('page8');
          page8.style.backgroundColor = "#e4a86c";

        }

      })
    })
  }
}

creataccount.onsubmit = async function (e) {

  e.preventDefault()
  let data = {}

  for (let input of e.target) {
    if (input.name) {
      data[input.name] = input.value
    }
  }

  nextPage = 13;

  const nomProfil = document.getElementById("nomProfil")
  myname = Math.floor(Math.random() * names.length)

  const imgProfil = document.getElementById("imgProfil")
  imgProfil.src = names[myname].src


  data["name"] = myname
  console.log(data);

  data["id"] = window.sessionStorage.getItem("id");


  target = await getTarget();
  if (target) {
    const nomProfil = document.getElementById("pseudo1")
    myname = target.name
    const imgProfil = document.getElementById("targetImg1")
    imgProfil.src = names[myname].src
    nomProfil.innerText = names[myname].name
  }



  if (!target) {
    await addTarget(data);
    displayPage(13);


  } else {
    await setQueue(data);
    displayPage(12);
  }


  console.log(page1);




}




const names = [{
  "name": "Maitre pelican feneant",
  "src": "./img/PelicanVertG.png"
},
{
  "name": "Empreur pingouin dérangé",
  "src": "./img/pinguinVertG.png"
},
{
  "name": "Princesse poule argnieuse",
  "src": "./img/PouleVertG.png"
},
{
  "name": " Docteur Aigle troublé",
  "src": "./img/aigleVertG.png"
},
{
  "name": "Princesse autruche robuste",
  "src": "./img/autrucheVertG.png"
},
{
  "name": "Duc hibou bourru",
  "src": "./img/HibbouVertG.png"


},
{
  "name": "Colonel canard cruel",
  "src": "./img/CanardVertG.png"
}


]



