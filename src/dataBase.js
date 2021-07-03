import React from 'react';
import './index.css';

let meetingAim = "BOIZ meeting";
let currentDataArray = ['0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
let dataArray = ['0', '0', '0', '0', '0', '0', '0','0', '0', '0', '0', '0', '2', '1', '3', '3', '2', '1', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '3', '2', '1', '1', '3', '2', '2', '1'];

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: 0
        };
    }
    rerenderLeft = (event) => {
        this.props.parentCallback(0);
        this.setState({ month: 0 });
        event.preventDefault();
    }
    rerenderRight = (event) => {
        this.props.parentCallback(1);
        this.setState({ month: 1 });
        event.preventDefault();
    }
    render() {
        let date = new Date();
        let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        return (
            <div className="topContent">
                <h1>Собираемся на: {meetingAim}</h1>
                <p id="showCode"> Код: </p>
                <div className="monthSelection">
                    <div className="leftArrow" onClick={this.rerenderLeft}> prev </div>
                    <div>{months[date.getMonth() + this.state.month]}</div>
                    <div className="rightArrow" onClick={this.rerenderRight}> next </div>
                </div>
                <ul className="week">
                    <li>ПН</li>
                    <li>ВТ</li>
                    <li>СР</li>
                    <li>ЧТ</li>
                    <li>ПТ</li>
                    <li>СБ</li>
                    <li>ВС</li>
                </ul>
            </div>
        )
    }
}

class DaysOfMonths extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            apiResponse: "",
        };
    }
    
    handleClick = (i) => {
        document.getElementById("id" + i).style.textDecorationColor = this.props.dataFromParent;
        //fetch("http://localhost:9000/mongoDB", {req: "hey"})
        //    .then(res => res.text())
        //    .then(res => this.setState({ apiResponse: res }));
        //const data = { username: 'example' };

        //fetch('http://localhost:9000/mongoDB/', {
        //    method: 'PUT', // or 'PUT'
        //    headers: {
        //        'Content-Type': 'application/json',
        //    },
        //    body: JSON.stringify(data),
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        console.log('Success:', data);
        //    })
        //    .catch((error) => {
        //        console.error('Error:', error);
        //    });
    }

    setDate() {
        let month = [42];
        let zeroDay;
        let b = 1;
        for (let i = 0; i < 42; i++) {
            month[i] = "";
        }
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth() + this.props.dataFromParent2, 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1 + this.props.dataFromParent2, 0);

        if (firstDay.getDay() === 0)
            zeroDay = 7;
        else
            zeroDay = firstDay.getDay();

        for (let i = zeroDay - 1; i < lastDay.getDate() + zeroDay - 1; i++) {
            month[i] = b;
            b++;
        }
        return month;
    }

    render() {
        let month = this.setDate();
        let dayId = [month.length];
        for (let i = 0; i < month.length; i++) {
            dayId[i] = 'id' + i;
        }
        console.log(this.state.apiResponse);
        return (
            <div className="dayTable">
                {
                    month.map((rows, i) => {
                        if ((i + 1) % 7 !== 0 && (i + 2) % 7 !== 0)
                            return (
                                <div className="day" onClick={() => this.handleClick(i)} id={dayId[i]} key={i}>{rows}</div>
                            )
                        else
                            return (
                                <div className="weekend" onClick={() => this.handleClick(i)} id={dayId[i]} key={i}>{rows}</div>
                            )
                    })
                }
            </div>
        )
    }
}

class ColorSelection extends React.Component {
    show() {
        let state;
        if (document.getElementById("showFreeDays").innerHTML === "Скрыть свободные дни")
            state = false;
        else
            state = true;

        if (state) { //paint if button is on
            dataArray.forEach((row, i) => {
                switch (row) {
                    case ('1'):
                        document.getElementById("id" + i).style.color = "#E26159";
                        break;
                    case ('2'):
                        document.getElementById("id" + i).style.color = "grey";
                        break;
                    case ('3'):
                        document.getElementById("id" + i).style.color = "#6DD176";
                        break;
                    default:
                        document.getElementById("id" + i).style.color = "black";
                        if ((i + 1) % 7 === 0 || (i + 2) % 7 === 0) {
                            document.getElementById("id" + i).style.color = "#ECC49C";
                        }
                        break;
                }
            })
            document.getElementById("showFreeDays").innerHTML = "Скрыть свободные дни";
        } else { //paint back if button off
            currentDataArray.forEach((row, i) => {
                document.getElementById("id" + i).style.color = "black";
                if ((i + 1) % 7 === 0 || (i + 2) % 7 === 0) {
                    document.getElementById("id" + i).style.color = "#ECC49C";
                }
            })
            document.getElementById("showFreeDays").innerHTML = "Показать свободные дни";
        }
    }



    positive = (event) => {
        document.getElementById("positiveAnswer").style.color = "#6DD176";
        document.getElementById("ambivalentAnswer").style.color = "black";
        document.getElementById("negativeAnswer").style.color = "black";
        this.props.parentCallback("#6DD176");
        event.preventDefault();
    }
    ambivalent = (event) => {
        document.getElementById("ambivalentAnswer").style.color = "grey";
        document.getElementById("positiveAnswer").style.color = "black";
        document.getElementById("negativeAnswer").style.color = "black";
        this.props.parentCallback("grey");
        event.preventDefault();
    }
    negative = (event) => {
        document.getElementById("negativeAnswer").style.color = "#E26159";
        document.getElementById("positiveAnswer").style.color = "black";
        document.getElementById("ambivalentAnswer").style.color = "black";
        this.props.parentCallback("#E26159");
        event.preventDefault();
    }
    render() {
        return (
            <div id="choosing" style={{ display: 'none' }}>
                <div className="select">Выберите вариант</div>
                <div className="answers">
                    <div className="positiveAnswer" id="positiveAnswer" onClick={this.positive}> Могу </div>
                    <div className="ambivalentAnswer" id="ambivalentAnswer" onClick={this.ambivalent}>  ヽ(´ー｀)ノ </div>
                    <div className="negativeAnswer" id="negativeAnswer" onClick={this.negative}>  Не Могу </div>
                </div>
                <div className="showFreeDays" id="showFreeDays" onClick={() => {
                    this.show(this.props.dataFromParent3)
                }
                }>Показать свободные дни</div>
            </div>
        )
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "white",
            month: 0
        }
    }
    callbackFunction = (childData) => {
        this.setState({ data: childData })
    }
    callbackFunction2 = (showMonths) => {
        this.setState({ month: showMonths })
    }
    render() {
        return (
            <div>
                <MainHeader parentCallback={this.callbackFunction2} />
                <DaysOfMonths dataFromParent={this.state.data} dataFromParent2={this.state.month} />
                <ColorSelection dataFromParent3={this.state.month} parentCallback={this.callbackFunction} />
            </div>
        )

    }
}
export default Parent;



