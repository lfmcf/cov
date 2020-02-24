import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components';
import { NavigationBar } from './components/layouts';
import { Recherche, Search, Add_post_step_1,  Add_post_step_2, Trajetdetail} from './components/post';
import { Login, RegisterOption, RegisterMaster } from './components/authentification';
import { Message } from './components/chat';
import axios from 'axios';
import Echo from 'laravel-echo';
import cookies from './components/assests/helpers/cookies';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.node = React.createRef();
    // }

    state = {
        dropDownToggle: false,
        user: '',
        id: '',
        notice: null,
        message: '',
        redirecting: false,
        data: [],
        messages: [],
        conversationBetween: {}
    }
   

    Updateuser = async (token) => {
        axios.get('api/user', {
            headers: { Authorization: `Bearer ${token}`, }
        }).then(res => {
            
            this.setState({user: res.data})
            this.connetToChannel(token)
        });

        let res = await axios.get('api/messages', {headers: { Authorization: `Bearer ${token}` }})
        let items = []
        res.data.map(ele => (items.push(ele)))
        this.setState({data: items})
    }

    removeUser = () => {
        cookies.remove('token')
        this.setState({
            user: '',
        })
    }

    // toggleDropdown = (e) => {
    //     console.log(this.node.current)
    //     if (this.node.current !== null) {
    //         if (this.node.current.contains(e.target)) {
    //             this.setState({
    //                 dropDownToggle: !this.state.dropDownToggle
    //             })
    //         } else {
    //             this.setState({dropDownToggle: false})
    //         }
    //     }
    // }

    connetToChannel = (token) => {
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'http://localhost:6001',
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            },
        });
        window.Echo.private('chat').listen('SendMessage', (e) => {
            console.log('Got event...');
            console.log(e)
            this.setState(prevState => ({
                notice: this.state.notice + 1,
                messages: [...prevState.messages, e.conversationrep]
            }));
        });
    }

    getConversationMessages = async (val) => {
        let res = await axios.post('api/getMessage', {val})
        let ListMessages = []
        res.data.messages.map(ele => (ListMessages.push(ele)))
        this.setState({messages: ListMessages})
        if(res.data.to_id.user_two === this.state.user.id){
            this.setState(prevState => {
                let conversationBetween = Object.assign({}, prevState.conversationBetween);  // creating copy of state variable jasper
                conversationBetween.from = res.data.to_id.user_two;
                conversationBetween.to = res.data.to_id.user_one;                     // update the name property, assign a new value                 
                return { conversationBetween };                                 // return new object jasper object
            })
        }else {
            this.setState(prevState => {
                let conversationBetween = Object.assign({}, prevState.conversationBetween);  // creating copy of state variable jasper
                conversationBetween.from = this.state.user.id;
                conversationBetween.to = res.data.to_id.user_two;                     // update the name property, assign a new value                 
                return { conversationBetween };                                 // return new object jasper object
            })
        }
    }

    componentDidMount() {
        document.body.addEventListener('click', this.toggleDropdown, false);
        window.io = require('socket.io-client');
        const token = cookies.get('token')
        
        if(token) {
            this.Updateuser(token)
        }
        this.props.hideLoader();
    }

    render() {
        const { user, data, messages, conversationBetween } = this.state
        return (
            <Router>
                <div>
                <NavigationBar dropDownToggle={this.state.dropDownToggle} node={this.node} user={this.state.user} removeUser={this.removeUser} />
                <Route exact path="/" component={Home}></Route>
                <Route path="/search" render={(props) => <Recherche {...props} showLoader={this.props.showLoader} hideLoader={this.props.hideLoader} />} />
                <Route path="/show" component={Search} />
                <Route path="/trajet-detail" render={(props) => <Trajetdetail {...props}  />} />
                <Route path="/add_post_step_1" component={Add_post_step_1} />
                <Route path="/post-next" component={Add_post_step_2} />
                <Route path="/login" render={(props) => <Login {...props} updateUser={this.Updateuser} />} />
                <Route path="/inscription"  component={RegisterOption} />
                <Route path="/register-email" render={(props) => <RegisterMaster {...props} /> } />
                <PrivateRoute path="/messages" component={ props => <Message {...props} data={data} getConversationMessages={this.getConversationMessages} messages={messages} conversationBetween={conversationBetween} user_id={user.id} />} />
                </div>
            </Router>
        )
    }
}

export default App;