import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import homeImage from '../assets/images/home.jpg';

const imageHeight = {
    height: '100vh',
};

class Home extends Component {
    render() {
        return (
        <React.Fragment>
            <Parallax bgImage={homeImage}>
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