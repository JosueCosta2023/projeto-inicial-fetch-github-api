
// import { getUser } from "/src/scripts/services/user.js";
// import { getRepositories } from "/src/scripts/services/repositories.js";
// import { getEvents } from "/src/scripts/services/events.js";
// import { user } from "/src/scripts/objects/user.js";
// import { scream } from "/src/scripts/objects/scream.js";

import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";
import { user } from "./objects/user.js";

import { scream } from "./objects/scream.js";

document.getElementById('btn-search').addEventListener('click', () =>{
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (e) =>{
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;
    if(isEnterKeyPressed){
        if(validateEmptyInput(userName)) return
        getUserData(userName);
    }

})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert("Preencha o campo com o nome do usuario do Github")
        return true;
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName);

    if(userResponse.message === "Not Found"){
        scream.renderNotFound()
        return
    }

    const eventsResponse = await getEvents(userName);
    const repositoriesResponse = await getRepositories(userName);
    user.setInfo(userResponse)
    user.setEvents(eventsResponse)
    user.setRepositories(repositoriesResponse)
    
    scream.renderUser(user);
}

