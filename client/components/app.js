import React from 'react';
import Header from './header';
// import BinsList from './bins/bins_list';
// import BinsMain from './bins/bins_main';
// import {BrowserRouter, Route, Switch, IndexRoute} from 'react-router-dom';


export default (props) => {
    return (

        <div>
            <Header />
            {props.children}
        </div>
       
    );
}