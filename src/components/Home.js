import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

const imageHeight = {
    height: '100vh',
};

const image1 = "https://media-public.canva.com/MADQ45o5yck/1/screen_2x.jpg";

class Home extends Component {
    render() {
        return (
        <React.Fragment>
            <Parallax bgImage={image1}>
                <div style={imageHeight}>
                    <div className="block">
                        <h1>
                            <p>AI FIGHTING</p>
                            SCB - Gameday
                            <p>COMPETITION</p>
                        </h1>
                        <h5>&copy; 2021 Sakul Montha | SCB Digital Academy</h5>
                    </div>
                </div>
            </Parallax>
        </React.Fragment>
        )
    }
}

export default Home;