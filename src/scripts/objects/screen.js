const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user, eventsUser) {
        this.userProfile.innerHTML = `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuario"/>
                        <div class="data">
                        <div class="followers-and-following">
                        <p>Seguidores <span>${user.followers}</span> </p>
                        <p>Seguindo <span>${user.following}</span></p>
                        </div>
                        <h1>${user.name ?? 'O usuario não possui nome cadastrado 😥'}</h1>
                         <p>${user.bio ?? 'O usuario não possui Bio cadastrada 😥'}</p>
                     </div>
                   </div>`
        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repositoriesItens += `<li>
                          <a href="${repo.html_url}" target="_blank">${repo.name}
                         <div class="about">
                         <p>🍴${repo.forks}</p>
                         <p>⭐${repo.stargazers_count}</p>
                         <p>👀${repo.watchers}</p>
                         <p>👨‍💻${repo.language ?? 'Linguagem indefinida'}</p>
                         </div>
                          </a>
                        
                          </li>`
        });
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                    <h2>Repositories</h2>    
                                    <ul>${repositoriesItens}</ul>
                                    </div>`

        }
        let eventMessage = 'Sem comentarios'
        let events = ''
        eventsUser.forEach(event => {
            events += `<li><div class="event">
                                    <p><span>${event.repo.name}</span></p>
                                    <p> - </p>
                                    <p>${eventMessage ?? 'sem descrição 😥'}</p>
                                    </div>
                                    </li>`
            if (event.payload.commits) {
                eventMessage = event.payload.commits[0].message
            }

        });

        if (events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                    <h2>Eventos</h2>    
                                    <ul>${events}</ul>
                                    </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuario não encontrado</h3>'
    }
}
export { screen }













