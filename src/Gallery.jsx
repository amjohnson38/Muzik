import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
import FontAwesome from 'react-fontawesome';
=======
>>>>>>> 2a92e82d6ca0401c921f50675a0145d5fd583421

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false

        }
    }

    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);
       
        if (!this.state.playing) {
            audio.play();
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio
            })
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio
                })
            }

        }
    }
    render() {
        const tracks = this.props.tracks;
        return (

            <div className="tracks-display">
                {tracks.map((track, k) => {
                    console.log('track', track);
                    const trackImg = track.album.images[0].url;
                    return (
                        <div key={k}
                            className="track"
                            /*anonymous function that plays the track when clicked*/
                            onClick={() => this.playAudio(track.preview_url)}
                        >
                            <img
                                src={trackImg}
                                className="track-img"
                                alt="track"
                            />
                            <div className="track-play">
                                <div className="track-play-inner">
                                    {
                                        this.state.playingUrl === track.preview_url
<<<<<<< HEAD
                                        ? <span>&#9724;</span>
                                        : <span>&#9658;</span>
=======
                                        ? <span>| |</span>
                                        : <span>&#9654;</span>
>>>>>>> 2a92e82d6ca0401c921f50675a0145d5fd583421
                                    }
                                </div>
                            </div>
                            <p className="track-text">
                                {track.name}
                            </p>

                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Gallery;