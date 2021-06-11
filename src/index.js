import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Button, Header, Icon, Modal, Image } from 'semantic-ui-react'
let dateSelection = 0;


export default function ModalExampleModal () {
    const [open, setOpen] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    return (
        <div className="footer">
            
                <div className="auth" onClick={() => setOpen(true)}>Войти</div>
                <div className="creation" onClick={() => setOpenSecond(true)}>Создать встречу</div>
            
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
                open={open}
                className="authorizationModal"
        >
            <Modal.Header>Введите данные</Modal.Header>

            <Modal.Content>
                <div>
                    <div>Введите код: </div>
                    <input type="text" name="codeText" />
                    <div>Введите имя: </div>
                    <input type="text" name="nameText" />
                </div>
            </Modal.Content>

            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}> Nope </Button>

                <Button
                    content="Подключиться"
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>
            </Modal>

            <Modal
                onClose={() => setOpenSecond(false)}
                onOpen={() => setOpenSecond(true)}
                open={openSecond}
                className="creationModal"
            >
                <Modal.Header>Создать встречу</Modal.Header>

                <Modal.Content>
                    <div>
                        <div>Цель: </div>
                        <input type="text" name="aimText" />
                        <div>Инициатор: </div>
                        <input type="text" name="creatorText" />
                    </div>
                </Modal.Content>

                <Modal.Actions>
                    <Button color='black' onClick={() => setOpenSecond(false)}> Nope </Button>

                    <Button
                        content="Создать"
                        labelPosition='right'
                        onClick={() => setOpenSecond(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
    </div>
    )

}


class MainHeader extends React.Component {
    render() {
        let date = new Date();
        let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        return (
            <div>
                <h1>Собираемся на:</h1>
                <p>{months[date.getMonth()]}</p>    
            </div>
            )
    }
}

class DaysOfMonths extends React.Component {
    setDays() {
        let days = [35];
        for (let i = 0; i < 35; i++) {
            days[i] = "";
        }
        return days;
    }
    setDate() {
        let month = this.setDays();
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let b = 1;
        for (let i = firstDay.getDay(); i < lastDay.getDate() + firstDay.getDay(); i++) {
            month[i] = b;
            b++;
        }
        return month;
    }

    componentDidMount() {
        switch (dateSelection) {
            case 1:
                document.getElementById("day").style.textDecorationColor = "green";
                document.getElementById("weekend").style.textDecorationColor = "green";
                break;
            case 2:
                document.getElementById("day").style.textDecorationColor = "yellow";
                document.getElementById("weekend").style.textDecorationColor = "yellow";
                break;
            case 3:
                document.getElementById("day").style.textDecorationColor = "red";
                document.getElementById("weekend").style.textDecorationColor = "red";
                break;
        }

    }
    render() {
        let month = this.setDate();
        let dayId = [month.length];
        for (let i = 0; i < month.length; i++) {
            dayId[i] = 'id' + i;
        }

        return (
            <div className="dayTable">
                {
                    month.map((rows, i) => {
                        if (i !== 5 && i !== 6 &&
                            i !== 12 && i !== 13 &&
                            i !== 19 && i !== 20 &&
                            i !== 26 && i !== 27 &&
                            i !== 33 && i !== 34)
                            return (
                                <div className="day" onClick={this.check} id={dayId[i]} key={i}>{rows}</div>
                            )
                        else
                        return (
                            <div className="weekend" onClick={this.check} id={dayId[i]} key={i}>{rows}</div>
                        )
                    })
            }
            </div>
        )
    }
}

class ColorSelection extends React.Component {
    greenColor() {
        dateSelection = 1;
        document.getElementById("positiveAnswer").style.color = "grey";
        document.getElementById("ambivalentAnswer").style.color = "black";
        document.getElementById("negativeAnswer").style.color = "black";
    }
    yellowColor() {
        dateSelection = 2;
        document.getElementById("ambivalentAnswer").style.color = "grey";
        document.getElementById("positiveAnswer").style.color = "black";
        document.getElementById("negativeAnswer").style.color = "black";
    }
    redColor() {
        dateSelection = 3;
        document.getElementById("negativeAnswer").style.color = "grey";
        document.getElementById("positiveAnswer").style.color = "black";
        document.getElementById("ambivalentAnswer").style.color = "black";
    }
    render() {
        return (
            <div>
            <div className="select">Выберите вариант</div>
                <div className="answers">
                    <div className="positiveAnswer" id="positiveAnswer" onClick={this.greenColor}> Могу </div>
                    <div className="ambivalentAnswer" id="ambivalentAnswer" onClick={this.yellowColor}>  ヽ(´ー｀)ノ </div>
                    <div className="negativeAnswer" id="negativeAnswer" onClick={this.redColor}>  Не Могу </div>
                </div>
            </div>
            )
    }
}

class Parent extends React.Component {
    render() {
        return (
            <div>
                <div><MainHeader /></div> 
                <div><DaysOfMonths /></div>
                <div><ColorSelection /></div>
                <div><ModalExampleModal /></div>

            </div>
        )
        
    }
}

ReactDOM.render(
    <Parent />,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*
 2cff00 g
 ff0000 r
 fbff00 y
 */