import React from 'react'; // обязательно подключаем для использования компонентов и jsx
import ReactDOM from 'react-dom'; // c помощью него будем рендерить в DOM
import Calculator from './components/tempcalc.js';
import Welcome from './components/basic';

// это объявление jsx элемента
const helloElem = <h1>Hello again, React!</h1>;

const name = "Oleg";
// через фигурные скобри можно встриавать код или переменные в jsx
// можно также устнавливать атрибуты
const HelloNameElem = <h1 style={{margin_left: 50}}>Hello, {name}!</h1>;

// по сути синтаксис jsx приводит к вызову React.createElement()
const exElem = React.createElement('h1',{className: "greetings"}, "Greetings!");

// При переносе на несеолько строк jsx необходимо заключать в круглые скобки
const timeElem = (
    <div>
        <h2>Hello!</h2>
        <h2>Time now is {new Date().toLocaleTimeString()}</h2>
    </div>
);


// Объявление компонента как класса
class Clock extends React.Component {
    // конструктор нужен в основном чтобы установить state
    constructor(props){
        // ОБЯЗАТЕЛЬНО вызов конструктора супер класса
        super(props);
        // state необходимо делать в виде объекта
        //!!! изменять state напрямую можно только в конструторе,
        // вне его только с помощью setState()
        this.state = {
            date: new Date()
        }
    }

    // Методы жизненого цикла компонента
    // этот вызывается, когда компонент отрендерился
    componentDidMount(){
        this.timerID = setInterval(
            ()=> this.tick(),
            1000
        )
    }

    // этот когда компонент будет удален
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick(){
        // setState() - говорит компоненту, что ему нужно проверить изменния и перерендерится
        // передавать лучше весь state целиком или частично, но оборачивать в объект
        // лучше избегать обновления опр. свойств
        this.setState(
            {
                date: new Date()
            }
        )
    }

    // метод render() - отвечает за рендер компонента
    render() {
        return (
            <div>
                <h2>Hello!</h2>
                <h2>Time is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

class ToggleButton extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            toggleOn: true
        }

        // это необходимо чтобы внедрить this в коллбэк события
        this.handleClick = this.handleClick.bind(this);
    }

    // обрабочитки событий следуюет называть как handle<EventName>
    handleClick(){
        this.setState(
            {
                toggleOn: !this.state.toggleOn
            }
        );
    }

    render(){
        return (
            // в качестве обработчика передается функция или же можно передать
            // стрелочную функцию, тогда this привязывать не нужно
            <button onClick={this.handleClick}>
                {this.state.toggleOn ? 'Включено' : 'Выключено'}
            </button>
        )
    }
}



// списки элементов
const names = ['Matt', 'Andrew', "Hillary", 'John'];

// теперь с помощью map() замутим массив элементов
const namesListItems = names.map(
    (elem) => {
        // добавим ключ к каждому элементу, это нужная для react вещь
        return <li key={elem.toString()}>{elem}</li>
    }
);



const renderContainer = document.getElementById('root');

// первый параметр react-элемент, второй dom-контейнер, куда будем рендерится
ReactDOM.render(<h1>Hello, React!</h1>, renderContainer);
// тут вместо jsx-литерала исп переменную, содер react-элемент
ReactDOM.render(helloElem, renderContainer);
ReactDOM.render(HelloNameElem, renderContainer);
ReactDOM.render(exElem, renderContainer);
ReactDOM.render(timeElem, renderContainer);
// компонент в синтаксисе jsx ничем не отличается от тега
ReactDOM.render(<Welcome name='Олег'/>, renderContainer);
ReactDOM.render(<Clock />, renderContainer);
ReactDOM.render(<ToggleButton />, renderContainer);

// список элементов можно прям так и передавать в контейнер
ReactDOM.render(<ul>{namesListItems}</ul>, renderContainer);
ReactDOM.render(<Calculator/>, renderContainer);