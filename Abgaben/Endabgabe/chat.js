"use strict";
var endabgabe;
(function (endabgabe) {
    //array mit allen Nachrichten:
    let allMessages;
    //eingeloggter User:
    let currentUserLoggedIn;
    buildPage();
    function buildPage() {
        //definiert den eingeloggten User:
        currentUserLoggedIn = JSON.parse(localStorage.getItem("currentUser"));
        //der eingeloggte Username erscheint oben mittig im Header, erstellt CSS:
        let usernameTitle = document.getElementById("usernameTitle");
        let usernameTitleh1 = document.createElement("h1");
        usernameTitleh1.innerHTML = currentUserLoggedIn.username;
        usernameTitle.appendChild(usernameTitleh1);
    }
    async function generateChatmessage(_chatroom) {
        currentUserLoggedIn = await JSON.parse(localStorage.getItem("currentUser"));
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/getAllMessages?";
        let responseMessages = await fetch(url);
        let responseMessagesJSON = await responseMessages.text();
        allMessages = JSON.parse(responseMessagesJSON);
        let chatbox = document.getElementById("chatbox");
        let chat1 = document.getElementById("chatroom");
        // lol, dass das funktioniert xD:
        chat1.innerHTML = "";
        chatbox.appendChild(chat1);
        for (let index = 0; index < allMessages.length; index++) {
            let chatmessage = document.createElement("div");
            if (allMessages[index].username == currentUserLoggedIn.username) {
                chatmessage.setAttribute("class", "mymessage");
            }
            else {
                chatmessage.setAttribute("class", "chatmessage");
            }
            let usernameMessage = document.createElement("h5");
            usernameMessage.innerHTML = allMessages[index].username;
            chatmessage.appendChild(usernameMessage);
            let textMessage = document.createElement("p");
            textMessage.innerHTML = allMessages[index].text;
            chatmessage.appendChild(textMessage);
            if (allMessages[index].chatroom == _chatroom) {
                chat1.appendChild(chatmessage);
            }
        }
        chat1.scrollTop = chat1.scrollHeight;
    }
    //gibt den Chatrooms die Buttonfunktionen:
    let currentChatroom = 0;
    let chatroom1button = document.getElementById("cr1");
    chatroom1button.addEventListener("click", handleClickCR1);
    let chatroom2button = document.getElementById("cr2");
    chatroom2button.addEventListener("click", handleClickCR2);
    let activeChatroomDiv = document.getElementById("activeChatroom");
    let activeChatroom = document.createElement("p");
    function handleClickCR1() {
        generateChatmessage(1);
        currentChatroom = 1;
        activeChatroom.innerHTML = "Chatroom " + currentChatroom.toString();
        activeChatroomDiv.appendChild(activeChatroom);
    }
    function handleClickCR2() {
        generateChatmessage(2);
        currentChatroom = 2;
        activeChatroom.innerHTML = "Chatroom " + currentChatroom.toString();
        activeChatroomDiv.appendChild(activeChatroom);
    }
    //gibt dem Send-Button seine Funktion:
    let sendButton = document.getElementById("sendMessage");
    sendButton.addEventListener("click", handleSendMessage);
    async function handleSendMessage() {
        if (currentChatroom != 0) {
            let chatroomOBJ = { chatroom: currentChatroom };
            let myFormMessage = document.getElementById("formMessage");
            let formDataMessage = new FormData(myFormMessage);
            let query = new URLSearchParams(formDataMessage);
            let queryChatroom = new URLSearchParams(chatroomOBJ);
            let queryUser = new URLSearchParams(currentUserLoggedIn.username);
            let url = "https://ultimategis2020.herokuapp.com";
            url = url + "/sendMessage?" + query.toString() + "&" + queryChatroom.toString() + "&" + queryUser.toString();
            console.log(url);
            await fetch(url);
            myFormMessage.reset();
            generateChatmessage(currentChatroom);
        }
        else {
            window.alert("Wähle zuerst einen Chatroom aus");
        }
    }
    //gibt Logout-Button seine Funktion: 
    let logoutButton = document.getElementById("logouticon");
    logoutButton.addEventListener("click", handleLogout);
    async function handleLogout() {
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/logout?";
        await fetch(url);
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }
})(endabgabe || (endabgabe = {}));
//# sourceMappingURL=chat.js.map