const gameComponentList = ["rock", "paper", "scissor"]
let iconList = document.querySelectorAll(".icon-box")
let overlayContainer = document.querySelector("#overlayContainer")
let score = sessionStorage.getItem('score') ? Number(sessionStorage.getItem('score')) : 0

document.querySelector('.score').textContent = score

const createGameComponentIcon = (name) => {
    let iconWrapper = document.createElement('div')
    let iconBox = document.createElement('div')
    let icon = document.createElement('img')

    iconWrapper.classList.add('icon-wrapper', `${name}-icon-wrapper`, 'selected')

    iconBox.classList.add('icon-box', 'selected')

    icon.classList.add('icon')
    icon.src = `./images/icon-${name}.svg`

    iconBox.appendChild(icon)

    iconWrapper.appendChild(iconBox)

    return iconWrapper
}

document.querySelector("#modalShowBtn").addEventListener('click', () => {
    overlayContainer.style.display = "flex"
})

document.querySelector("#modalCloseBtn").addEventListener('click', () => {
    overlayContainer.style.display = "none"
})

document.querySelector('#playAgainBtn').addEventListener('click', (e) => {
    document.querySelector('.game-box').classList.remove('game-in-progress')
    document.querySelector('.game-selection-panel').classList.remove('hide')
    document.querySelector('.game-progress-panel').classList.add('hide')
    document.querySelector('.computer-selected-icon-outer-model').classList.remove('hide')
    document.querySelector('.game-box').classList.remove('game-finished')

    document.querySelector('.user-selected-panel .icon-wrapper').remove()
    document.querySelector('.computer-selected-panel .icon-wrapper').remove()

    document.querySelector('.result-box').classList.add('hide')
})


for (let i = 0; i < iconList.length; i++) {
    const element = iconList[i];
    element.addEventListener('click', (e) => {
        document.querySelector('.game-box').classList.add('game-in-progress')
        document.querySelector('.game-selection-panel').classList.add('hide')
        document.querySelector('.game-progress-panel').classList.remove('hide')

        let computerPick = null
        let userPick = e.currentTarget.getAttribute("data-name")
        let iconForUser = createGameComponentIcon(userPick)
        document.querySelector('.user-selected-panel').appendChild(iconForUser)

        setTimeout(function () {
            computerPick = gameComponentList[Math.floor(Math.random() * 3)]
            let iconForComputer = createGameComponentIcon(computerPick)
            document.querySelector('.computer-selected-icon-outer-model').classList.add('hide')
            document.querySelector('.computer-selected-panel').appendChild(iconForComputer)
        }, 1000)

        setTimeout(function () {
            let userPickIdx = gameComponentList.indexOf(userPick)
            let computerPickIdx = gameComponentList.indexOf(computerPick)
            let result = ""

            if (userPickIdx == 0 && computerPickIdx == 2) result = 'you win'
            else if (userPickIdx == 2 && computerPickIdx == 0) result = 'you lose'
            else if (userPickIdx > computerPickIdx) result = 'you win'
            else if (userPickIdx < computerPickIdx) result = 'you lose'
            else if (userPickIdx === computerPickIdx) result = 'game draw'

            if (result === 'you win') {
                document.querySelector('.user-selected-panel .icon-wrapper').classList.add('winner')
                score += 1
            } else if (result === 'you lose') {
                document.querySelector('.computer-selected-panel .icon-wrapper').classList.add('winner')
                score -= 1
            }

            sessionStorage.setItem('score', score)
            document.querySelector('.score').textContent = score
            document.querySelector('.result-text').textContent = result
            document.querySelector('.result-box').classList.remove('hide')
            document.querySelector('.game-box').classList.add('game-finished')
        }, 1700)
    })
}