// пример управляемого компонента, т.е компонента состоянием которого управлеяе react

class LoginController extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loggedIn: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(name, password){
        this.name = name;
    
        this.setState(
            {
                loggedIn: true
            }
        );
    }

    handleLogout(){
        this.setState(
            {
                loggedIn:false
            }
        );
    }

    render(){
        if(this.state.loggedIn){
            return (
                <LogoutComponent name={this.name} onLogout={this.handleLogout} />
            )
        } else {
            return (
                <LoginComponent onLogin={this.handleLogin} />
            )
        }
    }

} 

class LoginComponent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState(
            {
                [name]: value
            }
        )
    }

    handleSubmit(){
        console.log("name: " + this.state.name);
        console.log("password: " + this.state.password);

        this.props.onLogin(this.state.name, this.state.password);
    }

    render(){
        return (
            // value берем из state чтобы дать возможность компоненту управлять этим
            // полем и вешаем обработчик onChange, чтобы отображать изменение значения
            <form onSubmit={this.handleSubmit}>
                <input name="name" value={this.state.name} required placeholder="name"
                onChange={this.handleChange}/>
                <input type="text" name="password" value={this.state.password} required 
                placeholder="password" onChange={this.handleChange}/>
                <button type="submit">Login</button>
            </form>
        )
    }
}

class LogoutComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: props.name
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        this.props.onLogout();
    }

    render(){
        return (
            <form>
            <a href="/">Hello,{this.state.name}</a>
            <button type="submit">Logout</button>
            </form>)
    }
}