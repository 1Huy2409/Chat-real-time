//gửi lời mời kết bạn
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");
            const userId = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND", userId)
        })
    })
}
//lời mời đã gửi
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", ()=> {
            button.closest(".box-user").classList.remove("add");
            const userId = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND", userId)
        })
    })
}
//lời mời kết bạn
//xóa lời mời
const listBtnDeleteFriend = document.querySelectorAll("[btn-delete-friend]");
if (listBtnDeleteFriend.length > 0) {
    listBtnDeleteFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");
            const userId = button.getAttribute("btn-delete-friend");
            socket.emit("CLIENT_REFUSE_FRIEND", userId)
        })
    })
}
//chấp nhận lời mời
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted");
            const userId = button.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND", userId)
        })
    })
}

// SERVER_RETURN_USERS_ACCEPT_LENGTH
socket.on("SERVER_RETURN_USERS_ACCEPT_LENGTH", (data) => {
    const badgeUserAccept = document.querySelector(`[badge-users-accept = "${data.UserIdB}"]`)
    if (badgeUserAccept) {
        badgeUserAccept.innerHTML = `${data.acceptLength}`
    }
})