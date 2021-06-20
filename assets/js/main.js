const nome = document.querySelector('#name')
const msg = document.querySelector('#msg')
const btn = document.querySelector('#btn')
const campoMsg = document.querySelector('#campo-msg')

btn.addEventListener("click", () => {
    if(msg.value != '') {
        let msgJson = { nome: nome.value, msg: msg.value}
        msgJson = JSON.stringify(msgJson)
        console.log(msgJson)
        
        conn.send(msgJson)

        showMsg('me', msgJson)

        msg.value = ''
        nome.value = ''
    }
})



var conn = new WebSocket('ws://localhost:8080');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    showMsg('outro', e.data)
}

function showMsg(who,msg) {
    msg = JSON.parse(msg)
    const p = document.createElement("p")
    const h5 = document.createElement("h5")
    p.className = 'mensagem'
    h5.className = 'usuario'
    console.log(msg.nome != nome.value)
    
    if(who == 'outro') {
        console.log('aqui')
        h5.className = 'outro-usuario'
        
    }
    h5.innerHTML = msg.nome + ': '
    p.innerHTML = msg.msg
    campoMsg.appendChild(h5)
    campoMsg.appendChild(p)
}

