/*import './App.css';


function App() {
    let date = new Date();
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    months[date.getMonth()];

    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let b = 1;
    for (let i = firstDay.getDay(); i < lastDay.getDate() + firstDay.getDay(); i++) {
        document.getElementById("day" + i).innerHTML = b;
        b++;
    }
  return (
    <div className="App">
          <header className="App-header">
              <meta charSet="UTF-8" />
              <title>Зашкварный календарь</title>
          </header>
              <h1>Укажите дни, когда свободны:</h1>
              <p className="months" type="text" id="months"></p>
              <div className="grid_container" id="grid_container">
                  <div className="grid_item" id="day1"></div>
                  <div className="grid_item" id="day2"></div>
                  <div className="grid_item" id="day3"></div>
                  <div className="grid_item" id="day4"></div>
                  <div className="grid_item" id="day5"></div>
                  <div className="grid_item" id="day6"></div>
                  <div className="grid_item" id="day7"></div>
                  <div className="grid_item" id="day8"></div>
                  <div className="grid_item" id="day9"></div>
                  <div className="grid_item" id="day10"></div>
                  <div className="grid_item" id="day11"></div>
                  <div className="grid_item" id="day12"></div>
                  <div className="grid_item" id="day13"></div>
                  <div className="grid_item" id="day14"></div>
                  <div className="grid_item" id="day15"></div>
                  <div className="grid_item" id="day16"></div>
                  <div className="grid_item" id="day17"></div>
                  <div className="grid_item" id="day18"></div>
                  <div className="grid_item" id="day19"></div>
                  <div className="grid_item" id="day20"></div>
                  <div className="grid_item" id="day21"></div>
                  <div className="grid_item" id="day22"></div>
                  <div className="grid_item" id="day23"></div>
                  <div className="grid_item" id="day24"></div>
                  <div className="grid_item" id="day25"></div>
                  <div className="grid_item" id="day26"></div>
                  <div className="grid_item" id="day27"></div>
                  <div className="grid_item" id="day28"></div>
                  <div className="grid_item" id="day29"></div>
                  <div className="grid_item" id="day30"></div>
                  <div className="grid_item" id="day31"></div>
                  <div className="grid_item" id="day32"></div>
                  <div className="grid_item" id="day33"></div>
                  <div className="grid_item" id="day34"></div>
                  <div className="grid_item" id="day35"></div>
              </div>
              <div className="colorSelection">
                  <div>Нажмите на цвет, чтобы выбрать его</div>
                  <ul>
                      <li>Занят</li>
                      <li>Не уверен</li>
                      <li>Свободен</li>
                  </ul>
              </div>
    </div>
  );
}
*/
//export default App;
