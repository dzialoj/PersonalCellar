import React from 'react';

import NewWineForm from './new-wine-form'

export default class NewWine extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: this.props.currentUsername
        }
    }
    render() {
        return (
            <div>
                <NewWineForm currentUsername={this.state.username}/>
            </div>
        )
    }
}