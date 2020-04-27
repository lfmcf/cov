import React, { Component } from 'react';
import './messageList.scss';
class MessageList extends Component {

    render() {
        const { conv, user_id } = this.props
        return(
            <div className="message-list-container">
                {conv.map((cv) => {
                    if (cv.user_id !== user_id) {
                        return <div className="message mine incoming_msg" key={cv.cr_id || cv.id}>
                            
                            <div className="bubble-container">
                                <div className="bubble">
                                    <p>{cv.reply}</p>
                                    <span className="time_date"> {cv.created_at}</span>
                                </div>
                            </div>
                        </div>
                    } else {
                        return <div className="bubble-container" key={cv.cr_id || cv.id}>
                            <div className="bubble">
                                <p>{cv.reply}</p>
                                <span className="time_date"> {cv.created_at}</span>
                            </div>
                        </div>
                    }
                })}
                <div className="send_message" >
                                <div style={{ backgroundColor: 'red', padding: "20px" }}>
                                    <textarea onChange={this.handleChange}></textarea>
                                    <button onClick={this.send}>Send</button>
                                </div>
                            </div>
            </div>
        );
    }
}

export default MessageList;