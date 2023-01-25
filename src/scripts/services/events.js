import { baseUrl,repositoriesQuantity  } from '../variables.js'

async function getEventsUser(userName){
const resposta = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`)
return await resposta.json()
}

export { getEventsUser }

























