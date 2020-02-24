import React, { Component } from 'react'
import './conversationList.scss';
class ConversationList extends Component {
    
    
    render() {
        const { data } = this.props
        console.log(data)
        return(
           <div>
               <h1>CHATS</h1>
                {data.map((dt) => (
                    
                    <div className="conversation-list-item" key={dt.c_id}>
                        <img className="conversation-photo" src="https://randomuser.me/api/portraits/men/17.jpg" alt="conversation" />
                        <div className="conversation-info"  onClick={() => this.props.getconvo(dt.c_id)}>
                            <h1 className="conversation-title">{dt.nom}</h1>
                            <p className="conversation-snippet">Test, which is a new approach to have all solutions
                                        astrology under one roof.</p>
                        </div>
                    </div>
                ))}
           </div>
        );
    }
}

export default ConversationList;