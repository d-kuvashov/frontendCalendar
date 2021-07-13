import React from 'react';
import './index.css';
import './dataBase.css';
import Axios from 'axios';
import { Modal } from 'semantic-ui-react';

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
                <h1 id="aimOfMeeting">Собираемся на: </h1>
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
            chosenDay: "",
            state: true,
        };
    }
    componentDidMount() {
        let data = [];
        for(let i = 0; i < 42; i++) {
            data[i]="";
        }
        this.setState({
            chosenDay: data,
        });

    }

    handleClick = (i) => {
        let data = this.state.chosenDay;
        document.getElementById("id" + i).style.textDecorationColor = this.props.color;
        data[i] = this.props.color;
        this.setState({
            chosenDay: data,
        })
        this.props.parentCallback(data);
    }
    
    setDate() {
        let month = [42]; 
        let zeroDay;
        let b = 1;
        for (let i = 0; i < 42; i++) {
            month[i] = "";
        }
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth() + this.props.typeOfMonth, 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1 + this.props.typeOfMonth, 0);

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
    constructor(props) {
        super(props);
        this.state = {
            freeDays: "",
            busyDays: "",
            state: true,
            secondState: true,
            open: false,
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => this.getProps(), 100);
    }

    getProps () {
        console.log(this.props.busyDaysFromDB)
        if (this.props.busyDaysFromDB !== '') {
            clearInterval(this.interval);
            this.setState({
                busyDays: this.props.busyDaysFromDB,
                freeDays: this.props.freeDaysFromDB,
            });
            let result = this.props.busyDaysFromDB;
            console.log(result);
            result.forEach((row, i) => {
                switch (row) {
                    case ('1'): document.getElementById("id" + i).style.textDecorationColor = "rgb(226,97,89,0.5)"; break;
                    case ('2'): document.getElementById("id" + i).style.textDecorationColor = "rgb(175,175,175,0.5)"; break;
                    case ('3'): document.getElementById("id" + i).style.textDecorationColor = "rgb(109,209,118,0.5)"; break;
                    default: document.getElementById("id" + i).style.textDecorationColor = "white"; break;
                }
            })
        }
    }

    showFreeDays () {
        let state;
        if (document.getElementById("showFreeDays").innerHTML === "Скрыть свободные дни")
            state = false;
        else
            state = true;
        let result = this.state.freeDays;
        if (result !== "") {
            if (state) {
                result.forEach((row, i) => {
                    switch (row) { 
                        case ('1'): document.getElementById("id" + i).style.color = "#E26159"; break;
                        case ('2'): document.getElementById("id" + i).style.color = "grey"; break;
                        case ('3'): document.getElementById("id" + i).style.color = "#6DD176"; break;
                        default:
                            document.getElementById("id" + i).style.color = "black";
                            if ((i + 1) % 7 === 0 || (i + 2) % 7 === 0) {
                                document.getElementById("id" + i).style.color = "#ECC49C";
                            }
                        break;
                    }
                })
                document.getElementById("showFreeDays").innerHTML = "Скрыть свободные дни";
            } else {
                for (let i = 0; i < 42; i++) {
                    document.getElementById("id" + i).style.color = "black";
                    if ((i + 1) % 7 === 0 || (i + 2) % 7 === 0) {
                        document.getElementById("id" + i).style.color = "#ECC49C";
                    }
                }
                document.getElementById("showFreeDays").innerHTML = "Показать свободные дни";
            }
        }
    }
    approval(){
        console.log("sending data...");
        let data = sessionStorage.getItem("Meeting");
        let info = JSON.parse(data);
        Axios.post("http://localhost:9000/choosingDay", {
            userName: info.userName,
            codeOfMeeting: info.codeOfMeeting,
            day: this.props.approveDataToDB,
        });
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
    setOpen(a) {
        this.setState({
            open: a,
        })
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
                <div className="bottomPanel">
                    <div className="showFreeDays" id="showFreeDays" onClick={() => { this.showFreeDays() }}>Показать свободные дни</div>
                    <div className="prove" onClick={()=>{this.approval();console.log("on"); this.setOpen(true);}}>Подтвердить выбранные дни</div>
                    
                    <Modal
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    open={this.state.open}
                    className="approvingClass"
                >
                    <Modal.Content className="contentA">
                        <div className="justHeader" >Спасибо за использование!</div>
                        <div className="justText">Введенные результаты учтены. Если необходимо изменить дни нажмите соответствующую кнопку. В противном случае можете нажать кнопку закрыть или просто закрыть вкладку. </div>
                        
                        <button className="changeButton" onClick={() => this.setOpen(false)} >Изменить </button>
                        <button className="closeButton" onClick={() => {window.close();}} > Закрыть </button>
                    </Modal.Content>

                </Modal>
                </div>
            </div>
        )
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "white",
            month: 0,
            freeDays: "",
            busyDays: "",
            approval: "",
        }
    }

    componentDidMount() {
        let data = {
                userName: "",
                aimOfMeeting: "",
                codeOfMeeting: "",
            };
        sessionStorage.setItem("Meeting", JSON.stringify(data));
        this.intervalId = setInterval(() => this.connectToDB(), 100);
    }

    connectToDB() {
        let data = sessionStorage.getItem("Meeting");
        let info = JSON.parse(data);
        if(info.codeOfMeeting !== '') {
            clearInterval(this.intervalId);
            let BusyDaysResult;
            let groupsFreeDays;
            Axios.post("http://localhost:9000/showingBusyDays", {
                code: info.codeOfMeeting,
                name: info.userName,
            }).then((response) => {
                BusyDaysResult = response.data;
                this.setState({
                    busyDays: BusyDaysResult,
                })
            })
            Axios.post("http://localhost:9000/showingFreeDays", {
                codeOfMeeting: info.codeOfMeeting,
            }).then((response) => {
                groupsFreeDays = response.data;
                this.setState({
                    freeDays:groupsFreeDays,
                })
            });
        }

    }

    callbackFunction = (childData) => {
        this.setState({ data: childData })
    }

    callbackFunction2 = (showMonths) => {
        this.setState({ month: showMonths })
    }

    callbackFunction3 = (childData3) => {
        this.setState({
            approval: childData3,
        })
    }
    render() {
        return (
            <div>
                <MainHeader parentCallback={this.callbackFunction2} />
                <DaysOfMonths   color={this.state.data} 
                                typeOfMonth={this.state.month}
                                parentCallback={this.callbackFunction3} />
                <ColorSelection freeDaysFromDB={this.state.freeDays} 
                                busyDaysFromDB={this.state.busyDays}
                                approveDataToDB={this.state.approval} 
                                parentCallback={this.callbackFunction} />
            </div>
        )

    }
}
export default Parent;



