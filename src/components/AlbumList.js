import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.state = { albums: [] };
    }

    componentDidMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums: response.data }));    
    }

    renderAlbums() {
        return this.state.albums.map(album => <AlbumDetail key={album.title} album={album} />);
    }

    render() {
        if (this.state.albums.length === 0) {
            return (
                <View style={styles.loadingStyle}>
                    <Text style={styles.textStyle}>Loading...</Text>
                </View>
            );
        }

        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

const styles = {
    loadingStyle: {
        alignItems: 'center',
        paddingTop: 20
    },
    textStyle: {
        fontSize: 20
    }
};

export default AlbumList;
