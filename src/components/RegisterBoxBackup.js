import React, {Component} from 'react';
import { Parallax } from 'react-parallax';
import trim from 'trim';

const initialState = {};
const image = "https://media-public.canva.com/MADQ4rQ5Z3E/1/screen_2x.jpg";

class RegisterBox extends Component {
    constructor(props){
        super(props);
        this.onKeyup = this.onKeyup.bind(this);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        contact: {
            cardId: '',
            email: '',
            aka: '',
            firstname: '',
            lastname: ''
        }
    })

    handleChange = (propertyName) => (event) => {
        const { contact } = this.state;
        const newContact = {
          ...contact,
          [propertyName]: event.target.value
        };
        this.setState({ contact: newContact });
    }

    onKeyup(e){
        if(e.keyCode === 13 && trim(e.target.value) !== ''){
            e.preventDefault();
            let dbCon = this.props.db.database().ref('/registered');
            const { contact } = this.state;

            dbCon.push({
                cardId: trim(this.state.contact.cardId),
                email: trim(this.state.contact.email),
                aka: trim(this.state.contact.aka),
                firstname: trim(this.state.contact.firstname),
                lastname: trim(this.state.contact.lastname)
            });
            this.setState(this.getInitialState());
        }
    }

    render() {
        return (
            <Parallax bgImage={image}>
                <div style={{height: '80vh'}}>
                    <div className="block">
                        <h1>
                            <p>To Fight with us!!</p>
                            <p>Register here</p>

                            <div className="wrapper">
                                <form class="contact-form row">
                                    <div className="input form-field col x-50">
                                        <input 
                                            type="email" 
                                            id="input" 
                                            className="input-text" 
                                            placeholder="Your email, e.g. nicholas.c@scb.co.th"
                                            onChange={this.handleChange('email')}
                                            onKeyUp={this.onKeyup}
                                            value={this.state.contact.email}
                                        />
                                        <label for="input" className="input-label">Email</label>
                                    </div>
                                    <div className="input form-field col x-50">
                                        <input 
                                            type="text" 
                                            id="input" 
                                            className="input-text" 
                                            placeholder="Your AKA, e.g. Autta" 
                                            onChange={this.handleChange('aka')}
                                            onKeyUp={this.onKeyup}
                                            value={this.state.contact.aka}
                                        />
                                        <label for="input" className="input-label">AKA</label>
                                    </div>
                                    <div className="input form-field col x-50">
                                        <input 
                                            type="text" 
                                            id="input" 
                                            className="input-text" 
                                            placeholder="Your first name, e.g. Nicholas" 
                                            onChange={this.handleChange('firstname')}
                                            onKeyUp={this.onKeyup}
                                            value={this.state.contact.firstname}
                                        />
                                        <label for="input" className="input-label">First name</label>
                                    </div>
                                    <div className="input form-field col x-50">
                                        <input 
                                            type="text" 
                                            id="input" 
                                            className="input-text" 
                                            placeholder="Your last name, e.g. Cage" 
                                            onChange={this.handleChange('lastname')} 
                                            onKeyUp={this.onKeyup}
                                            value={this.state.contact.lastname}
                                        />
                                        <label for="input" className="input-label">Last name</label>
                                    </div>
                                </form>
                            </div>

                            <p>Clone <a href="https://github.com/iamgique/FightingICE" target="_blank">FightingICE</a> and <a href="https://github.com/iamgique/FighterAI" target="_blank">FightingAI</a></p>
                        </h1>

                    </div>
                </div>
            </Parallax>
        )
    }
}

export default RegisterBox