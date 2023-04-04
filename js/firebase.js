import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,

} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  onValue,
  remove,
  off,

} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import {
  getStorage,
  ref as refi,
  uploadBytes,
  getDownloadURL,

}
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";




const firebaseConfig = {
  apiKey: "AIzaSyDhNeqtYvGxk90JaKGad5XrGP30V2QAEhc",
  authDomain: "atelier-72e02.firebaseapp.com",
  databaseURL: "https://atelier-72e02-default-rtdb.firebaseio.com",
  projectId: "atelier-72e02",
  storageBucket: "atelier-72e02.appspot.com",
  messagingSenderId: "906635582677",
  appId: "1:906635582677:web:8d81a95953fb23362c565c",
  measurementId: "G-Q8S2V2MB72"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//S'authentifier de manière anonyme
const auth = getAuth(app);

//On récupère l'objet DATABASE
const DATABASE = getDatabase(app);

//console.log(DATABASE);
const storage = getStorage(app);


//console.log(auth);
signInAnonymously(auth).then(() => {
  console.log("All good, you're signed in.");
});

const partieId = "p1" 
let path = ref(DATABASE, `data/wrong`);
let refTarget =ref(DATABASE, `/${partieId}/target`)
let refQueue = ref(DATABASE, `/${partieId}/queue`)
let refTrouver = ref(DATABASE, `/${partieId}/trouver`)
let refBasic =  ref(DATABASE, `/${partieId}`)
let refTrouver2 = ref(DATABASE, "/trouver")
let refSlash = ref(DATABASE, "/")
let refWinner = ref(DATABASE, `/winner`)

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // let uid = user.uid; // localStorage
    let id;
    let signin = false;

    const hash = window.location.hash.replace('#', '')
    if (!window.sessionStorage.getItem("id")) {
      id = makeid(8)
      window.sessionStorage.setItem("id", id)
    } else {
      id = window.sessionStorage.getItem("id")
    }

    window.getTarget = () => {
      return new Promise((resolve) => {

        onValue(refTarget, (snapshot) => {
          const val = snapshot.val();
          console.log(val);
          resolve(val)

        });
      })


    }
    window.setQueue = (objet) => {
      return new Promise((resolve) => {

        get(refQueue).then((snapshot) => {

          const val = JSON.parse(snapshot.val());
          val.push(objet)
          console.log(val);
          set(ref(DATABASE, `/${partieId}/queue`), JSON.stringify(val))
          resolve(true)


        });
      })
    }


    window.addTarget = (objet) => {
      return new Promise((resolve) => {
        const path = refTarget ;
        set(path, objet);
        const path2 = refTrouver;
        set(path2, "[]");
        const path3 = refQueue;
        set(path3, "[]");
        resolve(true)

      })
    }


  }

  window.uploadImage = (img, _id = id, callback) => {

    const imgRef = refi(storage, `/${partieId}/${_id}/trouver.jpg`)

    console.log(img, imgRef)

    get(refTrouver).then((snapshot) => {
      let val = (snapshot.val());
      if (typeof (val) == "string") {
        val = JSON.parse(snapshot.val());
      }
      console.log('test1')
      // console.log(val, id)

      if (val.indexOf(_id) != -1) {
        console.error('id not found!', _id)
        return
      }

      console.log('test2')

      uploadBytes(imgRef, img).then(() => {

        val.push(_id);
        const path = refTarget;
        console.log("uploaded", _id)
        update(path, { "trouver": val }).then(() => {
          callback()
        })

      })
        .catch(error => {
          console.log(error)
        })
    })

  }

  window.downloadImage = (_id) => {
    return new Promise((resolve, reject) => {
      const imgRef = refi(storage, `/${partieId}/${_id}/trouver.jpg`)
      getDownloadURL(imgRef).then((url) => {
        resolve(url)
      })
        .catch((error) => {
          console.log(error);
        })
    })
  }
});

window.listenTrouverTarget = (callback) => {

  onValue(refBasic, (snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val())
      let val = snapshot.val()
      if (typeof (val) == "string") {
        val = JSON.parse(val)
      }
      if (val.length > 0) {

        callback(val[0], val)
        return

      }

    }
  })

};

window.listenFound = (callback, _id = id) => {

  onValue(refTrouver, (snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val())
      let val = snapshot.val()
      if (typeof (val) == "string") {
        val = JSON.parse(val)
      }
      if (val.indexOf(_id) != -1) {
        callback(false)
      } else {
        callback(true)
      }

    }
  })

};

window.notFound = () => {

  const path = refTrouver2
  get(path).then((snapshot) => {
    let val = snapshot.val()
    if (typeof (val) == "string") {
      val = JSON.parse(val)
    }
    val.shift()
    update(refSlash, { "trouver": JSON.stringify(val) })
  })

}


window.onFound = (callback) => {
  onValue(refWinner, (snapshot) => {
    if (snapshot.exists()) {
      const val = snapshot.val();
      callback(val)
    } else {
      callback(null)
    }
  });
}

window.found = (_id) => {
  update(refSlash, { "winner": _id }).then(() => {
    callback(_id)
  })


}


// const info = 'This is some information that I want to save.';
// DATABASE.ref('info').set(info);

//Ecouteur d'éléments


function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}