
function randID(range) {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for(let i = 0; i < range; i++)  {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

module.exports = randID