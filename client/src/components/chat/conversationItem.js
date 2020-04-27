import React, { Component } from 'react'

class ConversationItem extends Component {
    state = {
        unread: ''
    }

    handleClick = (id, unread) => {
        //this.setState({unread: ''})
        this.props.getconvo(id, unread)
        //this.props.Changestyle()
        
    }

    componentDidMount = () => {
        this.props.unreadMessages.forEach(ele => {
           if(this.props.conversation.c_id == ele.conversation_id) {
               this.setState({unread: this.state.unread + 1})
           }
        })
    }

    render() {
        //console.log(this.props.unreadMessages)
        let dt = this.props.conversation
        // console.log(this.state.unread)
        return(
            <div className='conversation-list-item'>
                <img className="conversation-photo" src="https://randomuser.me/api/portraits/men/17.jpg" alt="conversation" />
                <div className="conversation-info" onClick={() => this.handleClick(dt.c_id, this.state.unread)}>
                    <h1 className="conversation-title">{dt.nom}</h1>
                    <p className="conversation-snippet">Test, which is a new approach to have all solutionsastrology under one roof.</p>
                    <p>{this.state.unread}</p>
                </div>
            </div>
        )
    }
}

export default ConversationItem;