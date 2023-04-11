/*
    Błażej Drozd - 10/2021
    MIT License
*/
const alertHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>`;
let round = 0;
const playersColors = ["yellow", "red"];
let players = []
let dragged;
let activePlayer = playersColors[0];
const winAlert = (who, roundN) => {
    document.querySelector(".alert").innerHTML += `${who} won in ${roundN} moves`;
    document.querySelector(".alert").style.display = "block";
    players.forEach((player) => {
        player.htmlObject.setAttribute("draggable", "false");
    });
}
const checkWinAll = () => {
    for (let index = 0; index < players.length; index++) {
        if (players[index].checkWin()) {
            return true;
        }
    }
    return false;
}
class Player {
    constructor(color, posX, posY) {
        this.color = color;
        this.classNameColor = `${color}Player`;
        this.posX = Number(posX);
        this.posY = Number(posY);
    }
    updatePos() {
        this.posX = Number(this.htmlObject.parentElement.id.charAt(1));
        this.posY = Number(this.htmlObject.parentElement.id.charAt(2));
    }
    createHTMLObject(objectID) {
        this.htmlObject = document.createElement("div");
        this.htmlObject.classList.add(this.classNameColor);
        this.htmlObject.classList.add("player");
        this.htmlObject.setAttribute("draggable", "true");
        this.htmlObject.setAttribute("objectID", objectID);
    }
    render() {
        let fieldID = `#f${this.posX}${this.posY}`;
        document.querySelector(fieldID).appendChild(this.htmlObject);
    }
    checkAllowedMoves() {
        this.updatePos();
        let allovedMoves = [];
        //top bullet
        const startIndexX = this.posX;
        const startIndexY = this.posY;
        let lastAllovedMove = "";
        for (let index = startIndexY + 1; index <= 5; index++) {

            if (document.querySelector(`#f${this.posX}${index}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${this.posX}${index}`;
            }
        }
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        //bot bullet
        for (let index = startIndexY - 1; index >= 1; index--) {

            if (document.querySelector(`#f${this.posX}${index}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${this.posX}${index}`;
            }
        }
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        //left bullet
        for (let index = startIndexX - 1; index >= 1; index--) {

            if (document.querySelector(`#f${index}${this.posY}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${index}${this.posY}`;
            }
        }
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        //right bullet
        for (let index = startIndexX + 1; index <= 5; index++) {

            if (document.querySelector(`#f${index}${this.posY}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${index}${this.posY}`;
            }
        }
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        //left top bullet
        let indexX = startIndexX;
        for (let index = startIndexY + 1; index <= 5; index++) {
            indexX -= 1;
            if (indexX < 1) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${indexX}${index}`;
            }
        }
        indexX = startIndexX;
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        //right top bullet
        for (let index = startIndexY + 1; index <= 5; index++) {
            indexX += 1;
            if (indexX > 5) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${indexX}${index}`;
            }
        }
        indexX = startIndexX;
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        //left bot bullet
        for (let index = startIndexY - 1; index >= 1; index--) {
            indexX -= 1;
            if (indexX < 1) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${indexX}${index}`;
            }
        }
        indexX = startIndexX;
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        //right bot bullet
        for (let index = startIndexY - 1; index >= 1; index--) {
            indexX += 1;
            if (indexX > 5) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                break;
            } else {
                lastAllovedMove = `#f${indexX}${index}`;
            }
        }
        indexX = startIndexX;
        if (lastAllovedMove != "") {
            allovedMoves.push(lastAllovedMove);
            lastAllovedMove = "";
        }
        return allovedMoves;
    }
    checkWin() {
        this.updatePos();
        //top bullet
        const startIndexX = this.posX;
        const startIndexY = this.posY;
        let eP = 0;
        for (let index = startIndexY + 1; index <= 5; index++) {
            if (document.querySelector(`#f${this.posX}${index}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${this.posX}${index}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        //bot bullet
        for (let index = startIndexY - 1; index >= 1; index--) {

            if (document.querySelector(`#f${this.posX}${index}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${this.posX}${index}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        //left bullet
        for (let index = startIndexX - 1; index >= 1; index--) {
            if (document.querySelector(`#f${index}${this.posY}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${index}${this.posY}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        //right bullet
        for (let index = startIndexX + 1; index <= 5; index++) {
            if (document.querySelector(`#f${index}${this.posY}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${index}${this.posY}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        let indexX = startIndexX;
        for (let index = startIndexY + 1; index <= 5; index++) {
            indexX -= 1;
            if (indexX < 1) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${indexX}${index}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        indexX = startIndexX;
        //right top bullet
        for (let index = startIndexY + 1; index <= 5; index++) {
            indexX += 1;
            if (indexX > 5) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${indexX}${index}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        indexX = startIndexX;
        //left bot bullet
        for (let index = startIndexY - 1; index >= 1; index--) {
            indexX -= 1;
            if (indexX < 1) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${indexX}${index}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        indexX = startIndexX;
        //right bot bullet
        for (let index = startIndexY - 1; index >= 1; index--) {
            indexX += 1;
            if (indexX > 5) {
                break;
            }
            if (document.querySelector(`#f${indexX}${index}`).hasChildNodes()) {
                let objID = Number(document.querySelector(`#f${indexX}${index}`).firstChild.getAttribute("objectID"));
                if (players[objID].color == this.color) {
                    eP += 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        if (eP >= 2) {
            winAlert(this.color, round);
            return true;
        } else {
            eP = 0;
        }
        return false;
    }
}
const nextRound = () => {
    round += 1;
    if (round >= 2) {
        if (activePlayer == "yellow") {
            activePlayer = playersColors[1];

        } else {
            activePlayer = playersColors[0];
        }
    }
    let numberOfAllovedMoves = 0;
    players.forEach((player) => {
        if (player.color == activePlayer) {
            player.htmlObject.setAttribute("draggable", "true");
            numberOfAllovedMoves += player.checkAllowedMoves().length;
        } else {
            player.htmlObject.setAttribute("draggable", "false");
        }
    });
    document.querySelector("#round").innerHTML =
        `Move: ${round}<br>Active player: ${activePlayer}<br>
        Number of allowed moves: ${numberOfAllovedMoves}`;
    document.querySelector(".alert").innerHTML = alertHTML;

}
const initGame = () => {
    /* events fired on the draggable target */
    document.addEventListener("drag", (event) => {

    }, false);

    document.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem
        dragged = event.target;
	if(dragged.getAttribute("draggable")=="false"){
		return;
	}
        players[dragged.getAttribute("objectID")].checkAllowedMoves().forEach((fieldID) => {
            document.querySelector(fieldID).classList.add("dropzone");
        })
    }, false);

    document.addEventListener("dragend", (event) => {
        document.querySelectorAll('.field').forEach((element) => {
            element.classList.remove("dropzone");
        });
    }, false);

    /* events fired on the drop targets */
    document.addEventListener("dragover", (event) => {
        // prevent default to allow drop
        event.preventDefault();
    }, false);

    document.addEventListener("dragenter", (event) => {
        // highlight potential drop target when the draggable element enters it
        if (event.target.classList.contains("dropzone")) {
            event.target.style.background = "green";
        }

    }, false);

    document.addEventListener("dragleave", (event) => {
        // reset background of potential drop target when the draggable element leaves it
        if (event.target.classList.contains("dropzone")) {
            event.target.style.background = "";
        }

    }, false);

    document.addEventListener("drop", (event) => {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        // move dragged elem to the selected drop target
        if (event.target.classList.contains("dropzone")) {
            event.target.style.background = "";
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
            document.querySelectorAll('.field').forEach((element) => {
                element.classList.remove("dropzone");
            });
            if (!checkWinAll()) {
                nextRound();
            }

        }

    }, false);

    createPlayers();

}
const createPlayers = () => {
    document.querySelector('.alert').style.display = "none";
    round = 0;
    activePlayer = playersColors[0]; 
    document.querySelectorAll('.field').forEach((field) => {
        field.innerHTML = "";
    });
    players = [];
    players = [
        new Player("yellow", "2", "1"),
        new Player("yellow", "4", "1"),
        new Player("yellow", "3", "4"),
        new Player("red", "2", "5"),
        new Player("red", "4", "5"),
        new Player("red", "3", "2"),
    ]
    for (let index = 0; index < players.length; index++) {
        players[index].createHTMLObject(index);
    }
    players.forEach((player) => {
        player.render();
    });
    nextRound();
}
initGame();
