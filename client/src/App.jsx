import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components';
import { NavigationBar } from './components/layouts';
import { Recherche, Show, Add_post_step_1,  Add_post_step_2, Trajetdetail} from './components/post';
import { Login, RegisterOption, RegisterMaster } from './components/authentification';
import { Message } from './components/chat';
import axios from 'axios';
import Echo from 'laravel-echo';
import cookies from './components/assests/helpers/cookies';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

    state = {
        dropDownToggle: false,
        user: '',
        id: '',
        notice: null,
        message: '',
        redirecting: false,
        conversations: [],
        messages: [],
        conversationBetween: {},
        messageId: [],
        unreadMessages: [],
        style: {display: "none"}
    }
   
    Updateuser = async (token) => {
        let user_id;
        let result = await axios.get('api/user', {headers: { Authorization: `Bearer ${token}`, }})
        let result1 = await axios.get('api/conversations', {headers: { Authorization: `Bearer ${token}` }})

        user_id = result.data.id

        let result2 = await axios.get('api/unread', {params: {id: user_id}})

        this.setState({
            user: result.data,
            conversations: result1.data,
            notice: result2.data.length,
            unreadMessages: result2.data
        })

        this.connetToChannel(token)

        // axios.get('api/unread', {params: {id: user_id}}).then(res => {
        //     res.data.length > 0 ? this.setState({notice: res.data.length, unreadMessages: res.data}) : this.setState({notice: ''});
        // });

        // let items = res.data

        // this.setState({conversations: items})
    }

    // getConversationMessages = async (val, unread) => {
       
    //     let res = await axios.post('api/getMessage', {val})
       
    //     this.setState({
    //         messages: res.data.messages,
    //         style: {display: "inline"}
    //     })
        
    //     if(res.data.to_id.user_two === this.state.user.id){
    //         this.setState(prevState => {
    //             let conversationBetween = Object.assign({}, prevState.conversationBetween);  
    //             conversationBetween.from = res.data.to_id.user_two;
    //             conversationBetween.to = res.data.to_id.user_one;                     
    //             return { conversationBetween };                              
    //         })
    //     }else {
    //         this.setState(prevState => {
    //             let conversationBetween = Object.assign({}, prevState.conversationBetween); 
    //             conversationBetween.from = this.state.user.id;
    //             conversationBetween.to = res.data.to_id.user_two;             
    //             return { conversationBetween }; 
    //         })
    //     }
    //     if(unread){
    //         axios.post('api/markread', {val}).then(rs  => { 
    //             var array = [...this.state.unreadMessages];
                
    //             var index = array.filter((ele) => { return ele.conversation_id !== val});
                
    //             //this.setState({unreadMessages: index});
                
    //             this.setState({
    //                 notice:this.state.notice - unread,
    //                 unreadMessages: index
    //             })
    //         });
    //     }
        
    // }

    removeUser = () => {
        cookies.remove('token')
        this.setState({
            user: '',
        })
    }

    toggleDropdown = (e) => {
        this.setState({dropDownToggle: true }, () => {
            document.addEventListener('click', this.closeMenu);
          });
    }

    closeMenu = (e) => {
        this.setState({ dropDownToggle: false }, () => {
            document.removeEventListener('click', this.closeMenu);
          });
    }

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
                messages: [...prevState.messages, e.conversationrep],
                unreadMessages: [...prevState.unreadMessages, e.messagestatus]
            }));
            
        });
    }

    componentDidMount() {
        var item = {
            name : "mmmm",
            isComplete: false
        }

        window.io = require('socket.io-client');
        const token = cookies.get('token')
        
        if(token) {
            this.Updateuser(token)
        }
        this.props.hideLoader();
    }

    
    

    render() {
        const { user, conversations, messages, conversationBetween, messageId , unreadMessages, style} = this.state
        console.log("App render")
        return (
            <Router>
                <div>
                <NavigationBar dropDownToggle={this.state.dropDownToggle} user={this.state.user} removeUser={this.removeUser} toggleDropdown={this.toggleDropdown} notice={this.state.notice} />
                <Route exact path="/" component={Home}></Route>
                <Route path="/recherche" render={(props) => <Recherche {...props} showLoader={this.props.showLoader} hideLoader={this.props.hideLoader} />} />
                <Route path="/show" component={Show} />
                <Route path="/trajet-detail" render={(props) => <Trajetdetail {...props} user={user} />} />
                <Route path="/add_post_step_1" component={Add_post_step_1} />
                <Route path="/post-next" component={Add_post_step_2} />
                <Route path="/login" render={(props) => <Login {...props} updateUser={this.Updateuser} />} />
                <Route path="/inscription"  component={RegisterOption} />
                <Route path="/register-email" render={(props) => <RegisterMaster {...props} /> } />
                <PrivateRoute path="/messages" component={ props => <Message {...props} conversations={conversations} messages={messages} getConversationMessages={this.getConversationMessages} user_id={user.id} conversationBetween={conversationBetween} messageId={messageId} unreadMessages={unreadMessages} style={style} />} />
                </div>
            </Router>
        )
    }
}

export default App;