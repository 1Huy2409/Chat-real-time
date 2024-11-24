const formSenData = document.querySelector(".inner-form");
if (formSenData) {
    //bat su kien submit cho form
    formSenData.addEventListener("submit", (e)=> {
        e.preventDefault();
        const content = e.target.elements.content.value;
        //lay duoc content => gui content nay len server
        socket.emit("CLIENT_SEND_MESSAGE", content);
        e.target.elements.content.value = "";
    })
}
//begin socketio
//server return message
socket.on("SERVER_RETURN_MESSAGE", (data)=> {
    //nhan duoc data, dua data vao nhung the div inner-coming or inner-outgoing
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const div = document.createElement("div");
    const body = document.querySelector(".inner-body");
    let nameHtml = ``;
    if (myId == data.user_id) {
        div.classList.add("inner-outgoing")
    }
    else {
        div.classList.add("inner-incoming");
        nameHtml = `
            <div class = "inner-name">${data.fullName}</div>
        `
    }
    let innerHtml = `
        ${nameHtml}
        <div class = "inner-content">${data.content}</div>
    `;
    div.innerHTML = innerHtml;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
})
const body = document.querySelector(".inner-body");
if (body) {
    body.scrollTop = body.scrollHeight;
}
//end server return message