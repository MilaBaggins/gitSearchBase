async function getData(userValue) {

    try {
        const data = await fetch(`https://api.github.com/users/${userValue}`)
        const dataJson = await data.json();
        const userArray = [dataJson.stringify]

        localStorage.setItem("usuario1", JSON.stringify(dataJson))
        console.log(dataJson)
        renderRecentProfiles()

    } catch {
        console.log("Deu ruim!")
    }
}



function setInput() {
    const buttonInputUser = document.getElementById('buttonSearchUser')

    buttonInputUser.addEventListener('click', async () => {
        const inputUser = document.getElementById('userInput')
        inputUser.value;
        console.log(inputUser.value)
        await getData(inputUser.value)
        window.location.href='pages/profile/index.html'
    })
}
setInput()

function renderRecentProfiles() {
    

    const getItem = localStorage.getItem("usuario1")
    const parseItem = JSON.parse(getItem)

    const divProfiles = document.getElementById('profiles-div')
    const smallRecentFoundTitle = document.getElementById('smallTitle')
    divProfiles.innerHTML = '' 

    const imgRecentProfilePic = document.createElement('img')
    imgRecentProfilePic.src = (parseItem.avatar_url)

    divProfiles.append(smallRecentFoundTitle, imgRecentProfilePic)
    
}
renderRecentProfiles() 


