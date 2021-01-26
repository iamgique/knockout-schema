import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import _ from 'lodash';

let maximumPlayer = 32;
const inside = {
    background: "#000000",
    color: "#ffffff",
    position: "relative",
    top: "60%",
    left: "50%",
    transform: "translate(-50%,-100%)",
    display: "inline",
};

const imageHeight = {
    height: '50vh',
};

const image = "https://media-public.canva.com/MAAgcB7thl4/1/screen_3x.jpg";

class Registered extends Component {
    constructor(props){
        super(props);
        this.state = {
          messages: []
        };
        let app = this.props.db.database().ref('registered');
        
        app.on('value', snapshot => {
          this.getData(snapshot.val());
        });
    }
    getData(values){
        let messagesVal = values;
        let messages = _(messagesVal)
                        .keys()
                        .map(messageKey => {
                            let cloned = _.clone(messagesVal[messageKey]);
                            cloned.key = messageKey;
                            return cloned;
                        }).value();
        this.setState({
            messages: messages
        });
    }
    render() {
        let messageNodes = this.state.messages.map((message, index) => {
            return (
                <li>
                    {message.aka}
                </li>
            )
        });

        return (
        <React.Fragment>
            <Parallax bgImage={image}>
                <div style={imageHeight}>
                    <div className="block">
                        <h3>Registered</h3>
                        <ul>
                            {messageNodes}
                        </ul>
                    </div>
                </div>
            </Parallax>
        </React.Fragment>
        )
    }
}

export default Registered;