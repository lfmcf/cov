import React, { Component } from 'react'
import './conversationList.scss';
import ConversationItem from './conversationItem';

class ConversationList extends Component {
    
    // handleClick = (e, id, unread) => {
    //     console.log(e.target.parentNode)
    //     this.props.getconvo(id, unread)
    // }
    
    render() {
        const { conversations, unreadMessages, getconvo } = this.props
        return(
           <div>
               <h1>CHATS</h1>
              
                {conversations.map((conversation) => (
                   <ConversationItem conversation={conversation} unreadMessages={unreadMessages} key={conversation.c_id} getconvo={getconvo} />
                ))}
           </div>
        );
    }
}

export default ConversationList;