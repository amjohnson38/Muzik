import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import soundwave from './images/soundwave.png'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            accessToken: undefined,
            tracks: []
        }
    }

    getToken() {
        const GATEWAY_URL = 'https://t2xklefjcd.execute-api.us-east-1.amazonaws.com/prod/access-token';
        fetch(GATEWAY_URL, {
            method: 'GET',
            mode: 'cors'
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log('new token received')
                this.setState({ accessToken: json.done.json.access_token });
                this.search();
            })


        console.log('GATEWAY_URL', GATEWAY_URL);
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        console.log('FETCH_URL', FETCH_URL);

        const myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, myOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.hasOwnProperty('error')) {
                    console.log('Invalid token');
                    this.getToken();

                } else {
                    const artist = json.artists.items[0];
                    this.setState({ artist });
                    FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
                    fetch(FETCH_URL, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + this.state.accessToken
                        },
                        mode: 'cors'

                    })
                        .then(response => response.json())
                        .then(json => {
                            if (json.hasOwnProperty('error')) {
                                console.log({ json });
                                this.getToken();

                            } else {
                                const tracks = json.tracks;
                                this.setState({ tracks });
                                console.log('artist\'s top tracks:', json);
                            }
                        })
                }
            });
    }


    render() {
        return (
            <div className="App">
                <div className="App-title">Muzik
                <img className="sound-wave" src={soundwave} alt={"soundwave"} />
                </div>

                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                            inputRef={ref => { this.input = ref; }}
                        />
                        <InputGroup.Addon
                            onClick={() => this.search()}>
                            <Glyphicon glyph="search">
                            </Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                {
                    this.state.artist !== null
                        ?
                        
                            <div className="artist-output">
                                <Profile
                                    artist={this.state.artist}
                                />
                                <div>
                                    <Gallery
                                        tracks={this.state.tracks}
                                    />
                                </div>
                            </div>
                            : <div></div>
                            }

                        </div>
            
        )
    }
}

export default App;