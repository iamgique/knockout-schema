import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import _ from 'lodash';
import registeredImage from '../assets/images/registered.jpg';

const imageHeight = {
    height: '50vh',
};

class Registered extends Component {
    constructor(props){
        super(props);
        this.state = {
          messages: []
        };
    }
    componentDidMount(){
        const ref = this.props.db.database().ref('/registered');
        const onDataCallback = (data) => {
            this.getData(data.val());
        }
        ref.on("value", onDataCallback);
    }
    async getData(values){
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
            <Parallax bgImage={registeredImage}>
                <div style={imageHeight}>
                    <div className="block">
                        <p style={{marginTop:'20px', fontWeight:'200'}}>Registered</p>
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