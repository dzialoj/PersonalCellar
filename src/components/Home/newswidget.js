import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

export default class WebWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = { tileData: [] }
    }

    componentDidMount() {
        const uri = 'https://newsapi.org/v2/everything?qInTitle=wine&apiKey=df63e481cfe94c2fb8cbf679973b7be4'
        fetch(uri)
            .then(result => {
                return result.json()
            })
            .then(data => {
                this.setState({ tileData: data.articles })
            })

    }

    render() {
        console.log(this.state.tileData)
        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'hidden',
            }}>
                <GridList style={{
                    width: '100%',
                    height: 175,
                    transform: 'translateZ(0)',
                }}>
                    {this.state.tileData.map((tile,i) => (
                        <GridListTile style={{overflow: 'hidden'}}key={i}>
                            <img src={tile.urlToImage} alt={tile.title} />
                            <GridListTileBar style={{width: 'inherit',overflow: 'hidden'}}
                                title={tile.title}
                                subtitle={tile.description}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}