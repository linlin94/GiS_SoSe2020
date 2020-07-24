"use strict";
var endabgabe;
(function (endabgabe) {
    /*

    let user01: User = {username: "Lindi94", password: "lindi94"};
    let user02: User = {username: "Mausi8", password: "mausi8"};

    export let allUsers: User[] = [user01, user02];

    let testmessage01: Message = {username: user01.username, text: "Hi du wie gehts so?", chatroom: 1};

    let testmessage02: Message = {username: user02.username, text: "Mir gehts super. Und dir so?", chatroom: 1};

    let testmessage03: Message = {username: user02.username, text: "Ist das Chatroom Nr2 ?", chatroom: 2};

    let testmessage04: Message  = {username: user01.username, text: "Ja, Willkommen!", chatroom: 2};
    */
    //array mit allen Nachrichten:
    let allMessages;
    //eingeloggter User:
    let currentUserLoggedIn = JSON.parse(localStorage.getItem("currentUser"));
    //der eingeloggte Username erscheint oben mittig im Header:
    let usernameTitle = document.getElementById("usernameTitle");
    let usernameTitleh1 = document.createElement("h1");
    usernameTitleh1.innerHTML = currentUserLoggedIn.username;
    usernameTitle.appendChild(usernameTitleh1);
    /*//Chatmessages dynamisch generieren:
    async function getAllMessages(): Promise<void> {
        let url: string = "https://ultimategis2020.herokuapp.com";
        url = url + "/getAllMessages?";
        let responseMessages: Response = await fetch (url);
        let responseMessagesJSON: string = responseMessages.toString();
        allMessages = JSON.parse(responseMessagesJSON);
    } */
    async function generateChatmessage(_chatroom) {
        let url = "https://ultimategis2020.herokuapp.com";
        url = url + "/getAllMessages?";
        let responseMessages = await fetch(url);
        let responseMessagesJSON = await responseMessages.text();
        console.log(responseMessagesJSON);
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
    }
    //gibt den Chatrooms die Buttonfunktionen:
    let currentChatroom = 0;
    let chatroom1button = document.getElementById("cr1");
    chatroom1button.addEventListener("click", handleClickCR1);
    let chatroom2button = document.getElementById("cr2");
    chatroom2button.addEventListener("click", handleClickCR2);
    function handleClickCR1() {
        generateChatmessage(1);
        currentChatroom = 1;
    }
    function handleClickCR2() {
        generateChatmessage(2);
        currentChatroom = 2;
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
            let url = "https://ultimategis2020.herokuapp.com";
            url = url + "/sendMessage?" + query.toString() + queryChatroom.toString();
            await fetch(url);
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