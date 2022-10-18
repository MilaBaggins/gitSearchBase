async function getData(userValue) {

    try {
        const data = await fetch(`https://api.github.com/users/${userValue}`)
        const buttonInputUser = document.getElementById('buttonSearchUser')
        buttonInputUser.innerHTML = ''
        buttonInputUser.innerText = 'Ver perfil do GitHub'

        const dataJson = await data.json();
        let userArray = []
        const localArray = localStorage.getItem('usuario1')


        if (localArray) {
            userArray = JSON.parse(localArray)
            if (userArray.length === 3) {
                userArray.pop()
            }
        }

        userArray.unshift(dataJson)

        if (data.status === 200) {
            localStorage.setItem("usuario1", JSON.stringify(userArray))
            console.log(dataJson)
            renderRecentProfiles()
            window.location.href = 'pages/profile/index.html'

        } else {
            const divLabelInput = document.getElementById('div-label-input')
            const labelUser = document.getElementById('label-user-id')
            const userInputhtml = document.getElementById('userInput')

            const userNotFound = document.createElement('small')
            userNotFound.classList.add('user-not-found-small')
            userNotFound.innerText = ('Usuário não encontrado')

            const buttonSearchUser = document.getElementById('buttonSearchUser')

            divLabelInput.innerHTML = ''
            divLabelInput.append(labelUser, userInputhtml, userNotFound, buttonSearchUser)

            const inputUser = document.getElementById('userInput')
            const buttonInputUser = document.getElementById('buttonSearchUser')
            buttonInputUser.disabled = true
            buttonInputUser.style.color = "var(--color-grey-6)"
            buttonInputUser.style.backgroundColor = "var(--color-brand-3)"
            inputUser.value = ''
            console.log("User not found")
        }

    } catch {
        console.log("User not found!")
    }
}



function setInput() {
    const buttonInputUser = document.getElementById('buttonSearchUser')
    buttonInputUser.disabled = true
    buttonInputUser.style.color = "var(--color-grey-6)"
    buttonInputUser.style.backgroundColor = "var(--color-brand-3)"

    buttonInputUser.addEventListener('click', async () => {
        const inputUser = document.getElementById('userInput')
        inputUser.value;
        console.log(inputUser.value)
        await getData(inputUser.value)

    })

    const inputUser = document.getElementById('userInput')
    inputUser.addEventListener('input', () => {
        let content = document.getElementById('userInput').value;
        if (content !== null && content !== "") {
            buttonInputUser.disabled = false
            buttonInputUser.style.color = "var(--color-white)"
            buttonInputUser.style.backgroundColor = "var(--color-brand-2)"
        } else {
            buttonInputUser.disabled = true
            buttonInputUser.style.color = "var(--color-grey-6)"
            buttonInputUser.style.backgroundColor = "var(--color-brand-3)"
        }
    })
}
setInput()


function renderRecentProfiles() {

    const getItem = localStorage.getItem("usuario1")
    const parseItem = JSON.parse(getItem)

    console.log(parseItem)
    const divProfiles = document.getElementById('profiles-div')
    const smallRecentFoundTitle = document.getElementById('smallTitle')
    divProfiles.innerHTML = ''
    divProfiles.append(smallRecentFoundTitle)

    parseItem.forEach(item => {
        const imgRecentProfilePic = document.createElement('img')
        imgRecentProfilePic.src = (item.avatar_url)
        divProfiles.append(imgRecentProfilePic)
    })

}
renderRecentProfiles()

function search() {
    const buttonInputUser = document.getElementById('buttonSearchUser')

    buttonInputUser.addEventListener('click', () => {
        buttonInputUser.innerHTML = ''

        const imgSpinner = document.createElement('img')
        imgSpinner.src = ('../assets/img/spinner.svg')
        imgSpinner.alt = ('Spinner Loading')
        imgSpinner.classList.add('loading')

        buttonInputUser.appendChild(imgSpinner)
    })
}
search()