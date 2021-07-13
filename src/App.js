import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './App.css';
import Axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSecond: false,
            aim: "",
            name: "",
            code: "",
            state: true,
        };
    }

    componentDidUpdate() {
        if (this.state.state) {
            if (this.state.aim !== '' && this.state.name !== '') {
                Axios.post("http://localhost:9000/creation", {
                    creatorName: this.state.name,
                    aimOfMeeting: this.state.aim,
                }).then((response) => {
                    document.getElementById("showCode").innerHTML = "Код: " + response.data;
                    let data = {
                        userName: this.state.name,
                        aimOfMeeting: this.state.aim,
                        codeOfMeeting: response.data,
                    };
                    sessionStorage.setItem('Meeting', JSON.stringify(data));
                    this.setState({
                        state: false,
                    });
                });
            } 
        }
    }

    createMeeting = () => {
        let aim = document.getElementById("aimText").value;
        let name = document.getElementById("creatorName").value;
        if (aim === "" || name === "") {
            alert("Слышь, мне показалось или ты быканул?")
        } else {
            this.setState({
                name: name,
                aim: aim,
            })

            document.getElementById("aimOfMeeting").innerHTML = "Собираемся на: " + aim;
            document.getElementById('auth').style.display = "none";
            document.getElementById('creation').style.display = "none";
            document.getElementById('choosing').style.display = "";

            this.setOpenSecond(false);
        }
    }
    authorization = () => {
        let code = document.getElementById("codeValue").value;
        let name = document.getElementById("nameValue").value
        let data;
        if (code === "" || name === "") {
            alert("Слышь, мне показалось или ты быканул?")
        } else {
            Axios.post("http://localhost:9000/authorization", {
                userName: name,
                codeOfMeeting: code,
            }).then((response) => {
                if (response.data === "Error! Check the code") {
                    this.setOpen(true);
                    document.getElementById("createMeeting").innerHTML = "Проверь код";
                    document.getElementById('choosing').style.display = "none";
                    document.getElementById('auth').style.display = "";
                    document.getElementById('creation').style.display = "";
                }
                else {
                    document.getElementById("aimOfMeeting").innerHTML = "Собираемся на: " + response.data;
                    document.getElementById("showCode").innerHTML = "Код: " + code;
                    document.getElementById('auth').style.display = "none";
                    document.getElementById('creation').style.display = "none";
                    document.getElementById('choosing').style.display = "";
                    data = {
                        userName: name,
                        aimOfMeeting: response.data,
                        codeOfMeeting: code,
                    };
                    sessionStorage.setItem('Meeting', JSON.stringify(data));
                    this.setOpen(false);
                }
            })
        }
        this.setOpen(false);
    }

    setOpen(a) {
        this.setState({
            open: a,
        })
    }

    setOpenSecond(a) {
        this.setState({
            openSecond: a,
        })
    }

    render() {
        return (
            <div className="footer">

                <div id="auth" className="authButton" onClick={() => this.setOpen(true)}>Войти</div>
                <div id="creation" className="creationButton" onClick={() => this.setOpenSecond(true)}>Создать встречу</div>

                <Modal
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    open={this.state.open}
                    className="authorizationModal"
                >
                    <Modal.Content>
                        <div className="createMeeting" id="createMeeting">Авторизация</div>
                        <label htmlFor="codeValue">Введите код: </label>
                        <input className="codeValue" id="codeValue" type="text" name="codeValue" />
                        <label htmlFor="nameValue">Введите имя: </label>
                        <input className="nameValue" id="nameValue" type="text" name="nameValue" />
                        <Button className="exitButton" content="Отмена" onClick={() => this.setOpen(false)} />
                        <Button className="approveButton" onClick={() => {
                            this.authorization();
                        }} > Войти </Button>
                    </Modal.Content>

                </Modal>

                <Modal
                    onClose={() => this.setOpenSecond(false)}
                    onOpen={() => this.setOpenSecond(true)}
                    open={this.state.openSecond}
                    className="creationModal"
                >
                    <Modal.Content>
                        <div className="createMeeting">Создать встречу</div>
                        <label htmlFor="aimValue">Цель:</label>
                        <input className="aimValue" id="aimText" type="text" name="aimText" />
                        <label htmlFor="creatorName">Инициатор: </label>
                        <input className="creatorName" id="creatorName" type="text" name="creatorName" />
                        <Button className="exitButton" content="Отмена" onClick={() => this.setOpenSecond(false)} />
                        <Button id="createButton" className="createButton" onClick={() => {
                            this.createMeeting();
                        }} > Создать </Button>
                    </Modal.Content>
                </Modal>
            </div>
        )

    }
}

export default App;





