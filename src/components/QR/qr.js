import React from 'react';
import QRCode from 'qrcode.react';

export default class QR extends React.Component {
    render(){
        var update = '192.168.1.6:3000/wines/' + this.props.wineObj
        return(
            <div>
                <QRCode value={update} />
            </div>
        )
    }
}