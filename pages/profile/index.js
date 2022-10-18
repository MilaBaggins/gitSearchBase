function creatCard(dataRepo){
    const cardsSection = document.getElementById('cards')

    const cardsRepository = document.createElement('div')
    cardsRepository.classList.add('cards-repository')
    cardsRepository.classList.add('container')

    const h3ProjectModule = document.createElement('h3')
    h3ProjectModule.innerText = (dataRepo.name)
    
    const pRepository = document.createElement('p')
    pRepository.classList.add('repository-p')
    pRepository.innerText = (dataRepo.description)

    const buttonRepository = document.createElement('button')
    buttonRepository.setAttribute('id', 'button-repository')
    buttonRepository.setAttribute('onclick', `location.href='${dataRepo.html_url}'`)
    buttonRepository.innerText = ('Repositório')

    const buttonDemo = document.createElement('button')
    buttonDemo.setAttribute('id', 'demo-button')
    buttonDemo.innerText = ('Demo')

    cardsRepository.append(h3ProjectModule, pRepository, buttonRepository, buttonDemo)
    cardsSection.appendChild(cardsRepository)


    return cardsSection
}



function renderRecentProfiles() {
    
    const getItem = localStorage.getItem("usuario1")
    const parseItem = JSON.parse(getItem)
    console.log(parseItem)

    const boxProfile = document.getElementById('box-profile')
    boxProfile.innerHTML = '' 

    const imgRecentProfilePic = document.createElement('img')
    imgRecentProfilePic.src = (parseItem[0].avatar_url)

    const profileInfo = document.createElement('div')
    profileInfo.classList.add('profile-info')

    const h3UserName = document.createElement('h3')
    h3UserName.classList.add('user-name')
    h3UserName.innerText = (parseItem[0].name)

    const pUserOcupation = document.createElement('p')
    pUserOcupation.classList.add('user-ocupation')
    pUserOcupation.innerText = (parseItem[0].bio)

    profileInfo.append(h3UserName, pUserOcupation)
    boxProfile.append(imgRecentProfilePic, profileInfo)

    getRepos(parseItem[0].repos_url)
    createMailTo(parseItem[0].email)

    return boxProfile
    
}
renderRecentProfiles() 

async function getRepos(url) {

    try {
        const data = await fetch(url)
        const dataJson = await data.json();
        dataJson.forEach(item =>{
            creatCard(item)
        })

    } catch {
        console.log("Deu ruim!")
    }
}

function createMailTo(email){
    const buttonsNavDiv = document.getElementById('buttons-nav')

    const buttonEmail = document.createElement('button')
    buttonEmail.setAttribute('id', 'button-nav-email')
    buttonEmail.setAttribute('onclick', `location.href='mailto:${email}'`)
    buttonEmail.innerText = ('Email')

    const buttonChangeUser = document.createElement('button')
    buttonChangeUser.setAttribute('id', 'button-nav-change-user')

    buttonChangeUser.addEventListener('click', () =>{
        window.location.href='../../index.html'
    })

    buttonChangeUser.innerText = ('Trocar de usuário')

    buttonsNavDiv.append(buttonEmail, buttonChangeUser)

    return buttonsNavDiv
}



