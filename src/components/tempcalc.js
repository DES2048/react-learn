import React from 'react';

const scaleNames = {
    c: 'Цельсия',
    f: 'Фаренгейта'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
  
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, conv_func){
    const tempInFloat = parseFloat(temperature);

    if(isNaN(tempInFloat)){
        return '';
    }

    const output =  conv_func(temperature);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props){
    if(props.celcius >=100){
        return <p>Вода закипит</p>;
    } else {
        return <p>Вода не закипит</p>;
    }
}

class TemperatureInput extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.onTemperatureChange(event.target.value);
    }

    render(){

        const temperature = this.props.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Введите температуру в градусах {scaleNames[scale]}</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            temperature: '',
            scale: 'c'
        };

        this.handleCelciusChange = this.handleCelciusChange.bind(this);
        this.handleFahrengeitChange = this.handleFahrengeitChange.bind(this);
    }

    handleCelciusChange(value){
        this.setState(
            {
                temperature: value,
                scale: 'c'
            }
        );
    }

    handleFahrengeitChange(value){
        this.setState(
            {
                temperature: value,
                scale: 'f'
            }
        );
    }

    render(){
        const temperature = this.state.temperature;
        const scale = this.state.scale;

        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;


        return (
            <div>
                <TemperatureInput scale='c' temperature={celsius}
                    onTemperatureChange={this.handleCelciusChange}/>
                <TemperatureInput scale='f' temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrengeitChange}/>
                <BoilingVerdict celcius={parseFloat(celsius)}/>
            </div>
        )
    }

}

export default Calculator;