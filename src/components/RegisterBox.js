import React, {Component} from 'react';
import { Input } from "reactstrap";
import _ from 'lodash';
import { Parallax } from 'react-parallax';
import trim from 'trim';
import registerBoxImage from '../assets/images/register-box.jpg';

const maximumPlayer = 32;

class RegisterBox extends Component {

    constructor(props){
        super(props);
        this.state = this.getInitialState();
        this.onInputChange = this.onInputChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    componentDidMount(){
        const ref = this.props.db.database().ref('/registered');
        const onDataCallback = (data) => {
            this.getData(data.val());
        }
        ref.on("value", onDataCallback);
    }

    getInitialState = () => ({
        email: '',
        aka: '',
        firstname: '',
        lastname: '',
        formErrors:{
            email: '',
            aka: '',
            firstname: '',
            lastname: '',
        },
        formValid: false,
        isValid: false,
        dbData: [],
        isDisabled: false
    })

    async getData(values){
        let messagesVal = values;
        let dbData = _(messagesVal)
            .keys()
            .map(messageKey => {
                let cloned = _.clone(messagesVal[messageKey]);
                cloned.key = messageKey;
                return cloned;
            }).value();
        this.setState({
            dbData: dbData,
            isDisabled: !(maximumPlayer > dbData.length)
        });
    }

    isDuplicateEmail(em){
        let db = this.state.dbData;
        var isFound = db.some(d => {
            return (d.email === em)
        });
        return isFound;
    }

    onInputChange(event){
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value
            }, 
            () => {this.validateField(name, value)
        });
    }
  
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let isValid = this.state.isValid;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        switch(fieldName) {
            case 'email':
                isValid = re.test(value);
                fieldValidationErrors.email = isValid ? '': 'Email is invalid';
                break;
            case 'aka':
                isValid = value.length >= 3;
                fieldValidationErrors.aka = isValid ? '': 'AKA is too short';
                break;
            case 'firstname':
                isValid = value.length >= 3;
                fieldValidationErrors.firstname = isValid ? '': 'Firstname is too short';
                break;
            case 'lastname':
                isValid = value.length >= 3;
                fieldValidationErrors.lastname = isValid ? '': 'Lastname is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            isValid: isValid,
            formValid: this.state.isValid
        });
    }

    isEmpty(obj) {
        return (_.isEqual(obj, '')) || (_.isEmpty(obj));
    }

    isError(obj) {
        return Object.keys(obj).find(value => obj[value].length > 0) === undefined
    }

    onKeyup(e){
        if(this.isDuplicateEmail(this.state.email)) {
            let fieldValidationErrors = this.state.formErrors;
            fieldValidationErrors.email = 'This email is duplicate';

            this.setState({
                formErrors: fieldValidationErrors,
                isValid: false,
                formValid: this.state.isValid
            });
        }

        if((this.isError(this.state.formErrors)) && (!this.isDuplicateEmail(this.state.email)) && (!this.isEmpty(this.state.email) && !this.isEmpty(this.state.aka) && 
                !this.isEmpty(this.state.firstname) && !this.isEmpty(this.state.lastname))
            ){
            if(e.keyCode === 13 && trim(e.target.value) !== ''){
                e.preventDefault();
                let dbCon = this.props.db.database().ref('/registered');
                    dbCon.push({
                        email: trim(this.state.email),
                        aka: trim(this.state.aka),
                        firstname: trim(this.state.firstname),
                        lastname: trim(this.state.lastname)
                    });
                this.setState(this.getInitialState());
            }
        }
    }

    render() {
        let registerWord = this.state.isDisabled ? 'We\'re sorry but the Tickets are sold out' : 'Register here'
        return (
            <Parallax bgImage={registerBoxImage}>
                <div style={{height: '80vh'}}>
                    <div className="block">
                        <h1>
                            <p style={{fontWeight:'200'}}>To Fight with us!!</p>
                            <p>{registerWord}</p>

                            <div className="wrapper">
                                <form className="contact-form row">
                                <div className="input form-field col x-50">
                                        <Input 
                                            className="input-text"
                                            type="text"
                                            name="email" 
                                            value={this.state.email} 
                                            onChange={this.onInputChange}
                                            onKeyUp={(e) => this.onKeyup(e)}
                                            disabled={this.state.isDisabled}
                                            maxLength="100"
                                            placeholder="Your email, e.g. nicholas.c@boxing.co.th" />
                                        <p style={{fontSize: '14px', fontWeight: '400', textAlign: 'left', color:'#851c24'}}>{this.state.formErrors.email}</p>
                                    </div>
                                    <div className="input form-field col x-50">
                                        <Input 
                                            className="input-text"
                                            type="text"
                                            name="aka" 
                                            value={this.state.aka} 
                                            onChange={this.onInputChange}
                                            onKeyUp={(e) => this.onKeyup(e)}
                                            disabled={this.state.isDisabled}
                                            maxLength="12"
                                            placeholder="Your AKA, e.g. Autta" />
                                        <p style={{fontSize: '14px', fontWeight: '400', textAlign: 'left', color:'#851c24'}}>{this.state.formErrors.aka}</p>
                                    </div>
                                    <div className="input form-field col x-50">
                                        <Input 
                                            className="input-text"
                                            type="text"
                                            name="firstname" 
                                            value={this.state.firstname} 
                                            onChange={this.onInputChange}
                                            onKeyUp={(e) => this.onKeyup(e)}
                                            disabled={this.state.isDisabled}
                                            maxLength="60"
                                            placeholder="Your first name, e.g. Nicholas" />
                                        <p style={{fontSize: '14px', fontWeight: '400', textAlign: 'left', color:'#851c24'}}>{this.state.formErrors.firstname}</p>
                                    </div>
                                    <div className="input form-field col x-50">
                                        <Input 
                                            className="input-text"
                                            type="text"
                                            name="lastname" 
                                            value={this.state.lastname} 
                                            onChange={this.onInputChange} 
                                            onKeyUp={(e) => this.onKeyup(e)}
                                            disabled={this.state.isDisabled}
                                            maxLength="60"
                                            placeholder="Your last name, e.g. Cage" />
                                        <p style={{fontSize: '14px', fontWeight: '400', textAlign: 'left', color:'#851c24'}}>{this.state.formErrors.lastname}</p>
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