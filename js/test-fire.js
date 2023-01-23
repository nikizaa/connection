
let creataccount=document.getElementById("creataccount");

const animals = [
    { name: "Pélican", sex: "M" },
    { name: "Pinguin", sex: "F" },
]

const adj = [
    { M: "fainéant", F: "fainéante" },
    { M: "dérangé", F: "dérangé" },
]
//?par priorité
// const colors = [
//     "#ff0000",
//     "yellow"
// ]

let state;

let states = {
    FIND_PERSON: 0,
    CONNECTED: 1,
}

let findPerson;

function changeState(newState) {
    state = newState

    if(state === states.FIND_PERSON) {
        console.log('FIND_PERSON!')
    }
}

window.addEventListener('load', () => {

    window.onFireLoaded = (event) => {

        if (event.signin) {
            addPerson({
                login: true,
                id: window.id
            }, window.id)

            changeState(states.CONNECTED)

        } else {
            changeState(states.CONNECTED)
        }

        onPerson((person) => {
            console.log(person)
        }, window.id)

        onList((list) => {

            if(state !== states.FIND_PERSON) {
                changeState(states.FIND_PERSON)
                findPerson = random(Object.keys(list))


                if(findPerson === window.id) {
                    console.log('SAME PERSON');
                }
            }

            console.log(findPerson)
        })
  


    // settingsPosition.selectedIndex = -1;
    creataccount.onsubmit=function(e){
        e.preventDefault()
        let data= {}
        
        for(let input of e.target){
          if(input.name){
            data[input.name]=input.value
          }
        }
        console.log(data);
      
        addPerson(data)

      }
    }
    // if (registering) {
    //     setPerson({
    //       name: "Pélican"
    //     })
    //   }


})