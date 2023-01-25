
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
  for (let i = 1; i <= 15; ++i) {
    document.getElementById(`page${i}`).style.display = i == num_page ? 'block' : 'none';
  }
  if (callback)
    callback()
}

function main() {
  buttonMoreLess();
  buttonpage2();
  buttonpage3();
  buttonpage4();
  buttonpage5();
  buttonpage6();
  buttonnon();
}
console.log(window.sessionStorage.getItem("id"))
function buttonMoreLess() {
  // Convert string to primitve number
  number = parseInt(output.innerText)

 /**
 * Start counter by adding any number to start counting.
 * In this case the ouput starts from 0 so to immediately
 * invoke the button to increment the counter add 1 to start 
 * counting in natural
 * number (counting numbers).
 */  counter = number + 1

  function decrement() {
    // Increment counter
    if (value > 0) {
      value = counter--
    }

    output.innerText = value
  }
  function increment() {
    // Increment counter
    value = counter++
    output.innerText = value
  }


  // Output the increment value for every click
  buttonadd.onclick = increment
  buttonless.onclick = decrement

}
function buttonpage2() {

  function toggleDivs() {

    displayPage(2)
    const page2 = document.getElementById('page2');
    page2.style.backgroundColor = "#e4a86c";

  }
  buttonOk.onclick = toggleDivs

}

function buttonpage3() {
  function toggleDivs2() {
    exit = true;
    // start = false;
    partie = false;
    getTarget(function (targetId) {
      console.log(targetId)
      onPerson(function (target) {

        if (target) {
          if (targetId == sessionStorage.getItem("id")) {

            targetData = target;
            const description = document.getElementById("description")
            let s = "";
            const pseudo = document.getElementById("pseudo");
            Object.keys(target).forEach((key) => {
              if (key != "name")
                s += "<p>" + target[key] + "</p>"
            })
            description.innerHTML = s;
            pseudo.innerText = names[target["name"]].name;
            const targetImg = document.getElementById("targetImg")
            targetImg.src = names[target.name].src
            // if(targ)
            displayPage(nextPage)
            buttontrouve.style.display = "none"
            return
          }
          if (partie) return
          cToiPopUp.style.display = "none";
          targetData = target;
          const description = document.getElementById("description")
          let s = "";
          const pseudo = document.getElementById("pseudo");
          Object.keys(target).forEach((key) => {
            if (key != "name")
              s += "<p>" + target[key] + "</p>"
          })
          description.innerHTML = s;
          pseudo.innerText = names[target["name"]].name;
          const targetImg = document.getElementById("targetImg")
          targetImg.src = names[target.name].src
          // if(targ)

          onFound((val) => {
            if (target == val) return
            console.log(val)

            if (!val) return
            if (val == window.sessionStorage.getItem("id")) {
              displayPage(7);
              const page7 = document.getElementById('page7');
              page7.style.backgroundColor = "#e4a86c";

            } else {
              displayPage(9)

            }
            console.log(val)
            reset()

            partie=false;

          })
          partie = true;
          displayPage(3, () => {
            start = true;
          })
          return;

        }


        if (partie) return
        const page6 = document.getElementById('page6');

        // page6.style.backgroundColor = "#e4a86c";

        const nomProfil = document.getElementById("nomProfil")
        myname = Math.floor(Math.random() * names.length)


        nomProfil.innerText = names[myname].name



        const imgProfil = document.getElementById("imgProfil")
        imgProfil.src = names[myname].src
        console.log("hello");
        partie = true;
        if (!start) {
          displayPage(6, () => {
            start = true
            console.log("startTrue")

          })
        }


      }, targetId)
    })
    getTarget((id) => {
      if (id == window.sessionStorage.getItem("id")) {
        listenTrouver((val) => {
          console.log("photo ajouté:", val);
          downloadImage(val, (url) => {
            console.log(url);
            buttontrouve.style.display = "none"
            popUp.style.display = "block"

            ouvrirButton.onclick = () => {
              const imgRecu = document.getElementById("imgRecu");
              imgRecu.src = url;
              displayPage(11);

            }
          })
          propositionId = val
          ouiCMoi.onclick = () => {
            found(() => {
              displayPage(15)
            }, val)

          }

        }, () => { }, true)
      }

    })


    nonPasMoi.onclick = () => {
      notFound(() => {
        popUp.style.display = "none"
        displayPage(3)

      })
    }

  }
  function toggleDivs12() {
    getTarget((id) => {
      onPerson((target) => {
        if (target) {
          displayPage(12);
          console.log("page12ici")
          const pseudo1 = document.getElementById("pseudo1");
          pseudo1.innerText = names[target["name"]].name;
          const targetImg1 = document.getElementById("targetImg1")
          targetImg1.src = names[target.name].src

        } else {
          toggleDivs2()
        }
      }, id)
    })
    exit = false;
  }

  chercherStart.onclick = toggleDivs2
  buttonStart.onclick = toggleDivs12
  // rechercher.onclick = toggleDivs2
  buttonBack.onclick = toggleDivs2

  buttonBackChercheur.onclick = toggleDivs2
}

bouttonSuivantbravo.onclick = () => {
  displayPage(14)
  const page14 = document.getElementById('page14');
  page14.style.backgroundColor = "#e4a86c";

}

bouttonSuivantTolate.onclick = () => {
  displayPage(14)
  const page14 = document.getElementById('page14');
  page14.style.backgroundColor = "#e4a86c";

}

retourchercher.onclick = () => {
  start = false
  displayPage(2)




}

gorecherche.onclick = () => {

  displayPage(12);

  nextPage = 3

}

function buttonpage4() {
  function toggleDivs3() {

    displayPage(4)

    capture()

  }
  buttontrouve.onclick = toggleDivs3

}

function buttonpage5() {
  function toggleDivs4() {

    // //?comment for the moment 

    console.log(imgData)

    if (imgData) {
      displayPage(5)
      uploadImage(imgData, window.sessionStorage.getItem("id"), () => {
        imgData == null;
        listenTrouver(() => { }, (vals) => {

          console.log(vals);
          if (vals.indexOf(window.sessionStorage.getItem("id")) == -1) {
            displayPage(8)
            const page8 = document.getElementById('page8');
            page8.style.backgroundColor = "#e4a86c";

          }

        }, false)
      })

    }


    //?______________________________
  }
  buttonenvoie.onclick = toggleDivs4

}

function buttonpage6() {
  function toggleDivs5() {
    exit = false;
    const page6 = document.getElementById('page6');

    // page6.style.backgroundColor = "#e4a86c";

    const nomProfil = document.getElementById("nomProfil")
    myname = Math.floor(Math.random() * names.length)


    nomProfil.innerText = names[myname].name


    const imgProfil = document.getElementById("imgProfil")
    imgProfil.src = names[myname].src
    console.log("hello");
    displayPage(6)
  }
  buttonokgo.onclick = toggleDivs5

}

function buttonnon() {
  function toggleDivs6() {
    displayPage(3)


  }
  buttonNon.onclick = toggleDivs6

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

creataccount.onsubmit = function (e) {
  e.preventDefault()
  let data = {}

  for (let input of e.target) {
    if (input.name) {
      data[input.name] = input.value
    }
  }

  nextPage = 13;

  data["name"] = myname
  console.log(data);



  addPerson(data);
  onList(function (val) {
    if (!val)
      return
    console.log(val);

    let persontofind = Object.keys(val)[Math.floor(Math.random() * Object.keys(val).length)]
    setTarget(persontofind);

  })




  console.log(page1);




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



const closeButton = document.getElementById("close-button");
const cToiPopUp = document.getElementById("cToiPopUp");

closeButton.addEventListener("click", function () {
  if (cToiPopUp.style.display === 'none') {
    cToiPopUp.style.display = 'block';
    cToiPopUp.style.transform = 'translateY(0)';
  } else {
    cToiPopUp.style.display = 'none';
    cToiPopUp.style.transform = 'translateY(-100%)';
  }
});

const scrollDown = document.getElementById('scrollDown');
const orangeCard = document.getElementById('commeHere');

// Add a click event listener to the button
scrollDown.addEventListener('click', () => {
  // Scroll to the orangeCard element
  orangeCard.scrollIntoView({ behavior: 'smooth' });
});

const screnshot = document.getElementById('screnshot');
const preview = document.getElementById('preview');

// Add a click event listener to the button
screnshot.addEventListener('click', () => {
  // Show the preview element
  preview.style.display = 'block';
});

window.onload = main

