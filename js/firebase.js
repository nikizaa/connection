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

let path = ref(DATABASE, `data/wrong`);

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

    window.listenTrouver = (callback, NF, target) => {

      onValue(ref(DATABASE, '/trouver'), (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          let val = snapshot.val()
          if (typeof (val) == "string") {
            val = JSON.parse(val)
          }
          if (target && val.length > 0) {

            callback(val[0], val)
            return

          }
          console.log(NF)
          if (!target)
            NF(val)
        }
      })

    };

    window.downloadImage = (_id, callback) => {
      const imgRef = refi(storage, _id + "/trouver.jpg")
      getDownloadURL(imgRef).then((url) => {
        callback(url)
      })
        .catch((error) => {
          console.log(error);
        })
    }

    window.notFound = (callback) => {

      const path = ref(DATABASE, "/trouver")
      get(path).then((snapshot) => {
        let val = snapshot.val()
        if (typeof (val) == "string") {
          val = JSON.parse(val)
        }

        val.shift()
        update(ref(DATABASE, "/"), { "trouver": JSON.stringify(val) })
        callback();
      })

    }


    window.onFound = (callback) => {
      onValue(ref(DATABASE, `/winner`), (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          callback(val)
        } else {
          callback(null)
        }
      });
    }

    window.found = (callback, _id) => {
      update(ref(DATABASE, `/`), { "winner": _id }).then(() => {
        callback(_id)
      })


    }
    window.reset = () => {
      reset(ref(DATABASE, '/'), null) //! QUOI AJOUTER LÀ
    }
    // MESSAGE TO SEND


    window.addPerson = (objet, _id = id) => {
      const path = ref(DATABASE, `people/${_id}`);
      set(path, objet);
    };

    window.updatePerson = (objet, _id = id) => {
      const path = ref(DATABASE, `people/${_id}`);
      update(path, objet);
    };



    // MESSAGE TO RECEIVE

    window.onList = (callback) => {
      onValue(ref(DATABASE, `/people`), (snapshot) => {
        const val = snapshot.val();
        callback(val)
      });
    };

    window.onPerson = (callback, _id = id) => {
      onValue(ref(DATABASE, `/people/${_id}`), (snapshot) => {
        const val = snapshot.val();
        callback(val)
      });
    }
    window.setTarget = (targetId) => {
      const path = ref(DATABASE, `/target`);
      set(path, targetId);
      const path2 = ref(DATABASE, `/trouver`);
      set(path2, "[]");
    }

    window.getTarget = (callback) => {
      onValue(ref(DATABASE, `/target`), (snapshot) => {
        const val = snapshot.val();
        callback(val)
      });
    }
    window.uploadImage = (img, _id = id, callback) => {

      const imgRef = refi(storage, _id + "/trouver.jpg")

      console.log(img, imgRef)

      get(ref(DATABASE, `/trouver`)).then((snapshot) => {
        let val = (snapshot.val());
        if (typeof (val) == "string") {
          val = JSON.parse(snapshot.val());
        }
        console.log('test1')
        // console.log(val, id)

        if (val.indexOf(id) != -1) {
          console.error('id not found!', id)
          return
        }

        console.log('test2')

        uploadBytes(imgRef, img).then(() => {

          val.push(id);
          const path = ref(DATABASE, `/`);
          console.log("uploaded", id)
          update(path, { "trouver": val }).then(() => {
            callback()
          })

        })
          .catch(error => {
            console.log(error)
          })
      })

    }


    // window.onFireLoaded({
    //   signin
    // })


    // console.log(uid)


    // ...
    // document.getElementById("userName").innerHTML = uid;
    // } else {
    //   // User is signed out
    //   // ...
  }


});



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