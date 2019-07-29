import React, { Component } from 'react';
import {markdown} from 'markdown';

class BinsViewer extends Component {
    render() {
        const rawHTML = markdown.toHTML(this.props.bin.content);
        return(
            <div className="list-group-item">
                <h2 >{this.props.bin.title}</h2>
                <div className="panel panel-success">
                    <p>{this.props.bin.content}</p>
                </div>
            </div>
        );
    }
}

export default BinsViewer