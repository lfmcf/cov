import React, { Component } from 'react';
import './messages.scss';
import ConversationList from './conversationList';
import MessageList from './messageList';
import Sendmessage from './sendMessage';
class Message extends Component{
    
    
    render() {
        const { data, messages, conversationBetween, user_id } = this.props
        
        return(
            <div className="messenger">
                <div className="scrollable sidebar">
                    <ConversationList data={data} getconvo={this.props.getConversationMessages} />
                </div>

                <div className="scrollable content">
                    <MessageList conv={messages} user_id={user_id} />
                </div>
            </div>
        );
    }
}

export default Message;