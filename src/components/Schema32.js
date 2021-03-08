import React, { Component } from 'react';
import { Markup } from 'interweave';
import { Parallax } from 'react-parallax';
import _ from 'lodash';
import knockoutImage from '../assets/images/knockout.jpg';

const imageHeight = {
    height: '100vh',
};
const maxStartMatch = 16;

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
                            <li className="match">Match 17</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 18</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 19</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 20</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 21</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 22</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 23</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 24</li>
                        </ul>
                        
                        <ul className="round">
                            <li className="match">Match 25</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 26</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 27</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 28</li>
                        </ul>
                        
                        <ul className="round">
                            <li className="match">Match 29</li>
                            <li>&nbsp;</li>
                            <li className="match">Match 30</li>
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