import React, { Component } from 'react';
import './messages.scss';
import ConversationList from './conversationList';
import MessageList from './messageList';
import axios from 'axios';
class Message extends Component {

    state = {
        message: '',
        styles: {display:"none"},
        messages: [],
        stkstk: {display:''}
    }

    handleChange = (e) => {
        this.setState({ message: e.target.value })
    }

    getConversationMessages = async (val, unread) => {
       
        let res = await axios.post('api/getMessage', {val})
       console.log(res.data)
        this.setState({
            messages: res.data.messages,
            styles: {display: "inline-block"},
            stkstk : {display:"none"}
        })
        
        if(res.data.to_id.user_two === this.props.user_id){
            this.setState(prevState => {
                let conversationBetween = Object.assign({}, prevState.conversationBetween);  
                conversationBetween.from = res.data.to_id.user_two;
                conversationBetween.to = res.data.to_id.user_one;                     
                return { conversationBetween };                              
            })
        }else {
            this.setState(prevState => {
                let conversationBetween = Object.assign({}, prevState.conversationBetween); 
                conversationBetween.from = this.props.user_id;
                conversationBetween.to = res.data.to_id.user_two;             
                return { conversationBetween }; 
            })
        }
        // if(unread){
        //     axios.post('api/markread', {val}).then(rs  => { 
        //         var array = [...this.state.unreadMessages];
                
        //         var index = array.filter((ele) => { return ele.conversation_id !== val});
                
        //         //this.setState({unreadMessages: index});
                
        //         this.setState({
        //             notice:this.state.notice - unread,
        //             unreadMessages: index
        //         })
        //     });
        // }
        
    }

    componentWillUnmount = () => {
        this.setState({
            styles: {display:"none"}
        })
    }

    send = () => {
        let message = {
            from: this.props.conversationBetween.from,
            to: this.props.conversationBetween.to,
            message: this.state.message
        }
        axios.post('api/insertmessage', message, {
            headers: { "X-Socket-ID": window.Echo.socketId() }
        }).then(res => {
            //console.log(res)
        })
    }

    render() {
        const { conversations, messages, user_id, getConversationMessages, messageId, unreadMessages } = this.props
        
        if (conversations.length > 0) {
            return (
                <div className="messenger">
                    <div className="scrollable sidebar conversation_list" >
                        <ConversationList conversations={conversations} getconvo={this.getConversationMessages} unreadMessages={unreadMessages}  />
                    </div>
                    {/* <div  > */}
                        <div className="messages-section" >
                            <div className="scrollable content">
                                <MessageList conv={this.state.messages} user_id={user_id}  />
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            );
        }else {
            return(<div>No conversation</div>)
        }
    }
}

export default Message;