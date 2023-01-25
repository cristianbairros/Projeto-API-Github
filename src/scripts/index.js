import { getEventsUser } from "./services/events.js"
import { getUser } from "./services/user.js"
import { getRepositories } from "./services/repositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

document.querySelector('#btn-search').addEventListener('click', () => {
    let userName = document.querySelector('#input-search').value
    if (validateEmptyInput(userName)) return
    getUserData(userName)

})
function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuario do GitHub')
        return true
    }

}

document.querySelector('#input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keycode
    if (validateEmptyInput(userName)) return
    if (key === 13) {
        getUserData(userName)
    }

})

async function getUserData(userName) {
    const userResponse = await getUser(userName)

    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    const responseEventsUser = await getEventsUser(userName)
    const eventsUser = responseEventsUser.filter(events => events.type === "CreateEvent" || events.type === "PushEvent")

    screen.renderUser(user, eventsUser)



}










