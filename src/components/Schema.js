import React, { Component } from 'react';
import { Markup } from 'interweave';
import { Parallax } from 'react-parallax';
import _ from 'lodash';
import knockoutImage from '../assets/images/knockout.jpg';

const imageHeight = {
    height: '100vh',
};
const maxStartMatch = 10;

class Schema extends Component {
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
        const rows = this.state.messages.reduce(function (rows, key, index) { 
            return (index % 2 === 0 ? rows.push([key.aka]) 
              : rows[rows.length-1].push(key.aka)) && rows;
        }, []);

        const startMatch = rows.map((row, i) => ( 
            <li className="match">
                { row.map((col, index) => (index % 2 === 0 ? <p>{i + 1}. <b>{col}</b> </p> : <p> vs <b>{col}</b></p>)) }
            </li>
        ))

        const freeMatch = [...Array(maxStartMatch - startMatch.length)].map((x, i) => ( 
            <li className="match">
                <p>{i + startMatch.length + 1}. Free Match </p>
            </li>
        ))

        return (
        <React.Fragment>
            <Parallax bgImage={knockoutImage}>
                <div style={imageHeight}>
                    <div className="knockout-scheme">
                        <ul className="round">
                            {startMatch}
                            {freeMatch}
                        </ul>
                        <ul className="round">
                            <li className="match"><p><b>KnockingNew</b> vs <b>Innozent</b></p> </li>
                            <li>&nbsp;</li>
                            <li className="match"><p><b>PS</b> vs <b>X Æ A-12</b></p> </li>
                            <li>&nbsp;</li>
                            <li className="match"><p><b>Moshirosang</b> vs <b>Ayuth</b></p> </li>
                            <li>&nbsp;</li>
                            <li className="match"><p><b>Pookie</b> vs <b>Tonhom</b></p> </li>
                            <li>&nbsp;</li>
                            <li className="match"><p><b>fae samphan gym</b> vs <b>mildmi</b></p> </li>
                        </ul>
                        
                        <ul className="round">
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li className="match"><p><b>Moshirosang</b> vs <b>PS</b></p> </li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            
                            <li className="match"><p><b>Innozent</b> vs <b>fae samphan gym</b></p> </li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            
                            <li className="match">Tonhom</li>
                            <li>&nbsp;</li>
                            
                            
                        </ul>
                        
                        <ul className="round">
                            <li className="match">Match 19</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 20</li>
                        </ul>
                        
                        <ul className="round">
                            <li className="match">Final Round</li>
                        </ul>

                        <ul className="round">
                            <li className="match">Knockout Game!!</li>
                        </ul>
                    </div>
                </div>
            </Parallax>
        </React.Fragment>
        )
    }
}

export default Schema;