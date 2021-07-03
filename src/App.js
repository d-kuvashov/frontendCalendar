import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './App.css';

function codeGenerator() {
    let symbols = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
        code += symbols[Math.floor(Math.random() * 33)];
    }
    return code;
}
function App() {
    const [open, setOpen] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    let state = true;
        return (
            <div className="footer">

                <div id="auth" className="authButton" onClick={() => setOpen(true)}>Войти</div>
                <div id="creation" className="creationButton" onClick={() => setOpenSecond(true)}>Создать встречу</div>

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    className="authorizationModal"
                >
                    <Modal.Content>
                        <div className="createMeeting">Авторизация</div>
                        <label htmlFor="codeValue">Введите код: </label>
                        <input className="codeValue" id="codeValue" type="text" name="codeValue" />
                        <label htmlFor="nameValue">Введите имя: </label>
                        <input className="nameValue" id="nameValue" type="text" name="nameValue" />
                        <Button className="exitButton" content="Отмена" onClick={() => setOpen(false)} />
                        <Button className="approveButton" onClick={() => {
                            let code = document.getElementById("codeValue").value;
                            let name = document.getElementById("nameValue").value
                            if (state) {
                                if (code === "" || name === "") {
                                    alert("Слышь, мне показалось или ты быканул?")
                                } else {
                                    console.log(document.getElementById("codeValue").value);
                                    document.getElementById('auth').style.display = "none";
                                    document.getElementById('creation').style.display = "none";
                                    document.getElementById('choosing').style.display = "";
                                    setOpen(false);
                                    state = false;
                                }
                            }
                        }} > Войти </Button>
                    </Modal.Content>

                </Modal>

                <Modal
                    onClose={() => setOpenSecond(false)}
                    onOpen={() => setOpenSecond(true)}
                    open={openSecond}
                    className="creationModal"
                >
                    <Modal.Content>
                        <div className="createMeeting">Создать встречу</div>
                        <label htmlFor="aimValue">Цель:</label>
                        <input className="aimValue" id="aimText" type="text" name="aimText" />
                        <label htmlFor="creatorName">Инициатор: </label>
                        <input className="creatorName" id="creatorName" type="text" name="creatorName" />
                        <Button className="exitButton" content="Отмена" onClick={() => setOpenSecond(false)} />
                        <Button id="createButton" className="createButton" onClick={() => {
                            let aim = document.getElementById("aimText").value;
                            let name = document.getElementById("creatorName").value;
                            if (state) {
                                if (aim === "" || name === "") {
                                    alert("Слышь, мне показалось или ты быканул?")
                                } else {
                                    const code = document.createElement("div");
                                    const codeValue = document.createTextNode(codeGenerator());
                                    code.appendChild(codeValue);
                                    const currentDiv = document.getElementById("showCode");
                                    currentDiv.appendChild(codeValue);
                                    document.getElementById('auth').style.display = "none";
                                    document.getElementById('creation').style.display = "none";
                                    document.getElementById('choosing').style.display = "";
                                    setOpenSecond(false);
                                    state = false;
                                }
                            }
                            
                        }} > Создать </Button>
                    </Modal.Content>
                </Modal>
            </div>
        )
    
}

export default App;
