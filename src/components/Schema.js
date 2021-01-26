import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import _ from 'lodash';

const imageHeight = {
    height: '100vh',
};

const image = "https://media-public.canva.com/MADGx8_0l5o/4/screen_2x.jpg";

class Schema extends Component {
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
        let messageNodes = this.state.messages.map((message) => {
            return (
                <li className="match">
                    {message.aka}
                </li>
            )
        });

        return (
        <React.Fragment>
            <Parallax bgImage={image}>
                <div style={imageHeight}>
                    <div className="knockout-scheme">
                        <ul className="round">
                            {/*messageNodes*/}
                            <li className="match">Match 1</li>
                            <li className="match">Match 2</li>
                            <li className="match">Match 3</li>
                            <li className="match">Match 4</li>
                            <li className="match">Match 5</li>
                            <li className="match">Match 6</li>
                            <li className="match">Match 7</li>
                            <li className="match">Match 8</li>
                            <li className="match">Match 9</li>
                            <li className="match">Match 10</li>
                            <li className="match">Match 11</li>
                            <li className="match">Match 12</li>
                            <li className="match">Match 13</li>
                            <li className="match">Match 14</li>
                            <li className="match">Match 15</li>
                            <li className="match">Match 16</li>
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