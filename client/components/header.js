import React, { Component } from 'react';
import Accounts from './accounts';
import {Link, browserHistory} from 'react-router';


class Header extends Component {

    onBinClick(event) {
        event.preventDefault();
        Meteor.call('bins.insert', (error, binId) => {
            browserHistory.push(`/bins/${binId}`);
        });
    }
    render() {
        return(
            <nav className="nav navbar-default">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">FakeBash.im</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <Accounts />
                    </li>
                    <li>
                        <a href="#" onClick={this.onBinClick.bind(this)}>Add Post + </a>
                    </li>
                </ul>
            </nav>
        );        
    }
}

export default Header;