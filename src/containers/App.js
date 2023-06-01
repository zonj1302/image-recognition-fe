import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import Rank from "../components/Rank";
import FaceRecognition from "../components/FaceRecognition";
import Signin from "../components/Signin";
import Register from "../components/Register";
import '../assets/styles/App.css';
import ParticlesBg from 'particles-bg';

function App() {
    const [ input, setInput ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ box, setBox ] = useState({});
    const [ route, setRoute ] = useState('signin');
    const [ isSignedIn, setIsSignedIn ] = useState(false);
    const [ user, setUser ] = useState({
        id: '',
        entries: 0,
        name: '',
        email: '',
        joined: ''
    })

    const loadUser = (data) => {
        setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        })
    }

    const imageLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            left: clarifaiFace.left_col * width,
            top: clarifaiFace.top_row * height,
            right: width - (clarifaiFace.right_col * width),
            bottom: height - (clarifaiFace.bottom_row * height)
        }
    }

    const displayImageBox = (box) => {
        setBox(box);
    }
    
    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const onSubmit = () => {
        setImageUrl(input);
        fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            setUser(prevState => ({...prevState, entries: count}))
                        });
                }
                displayImageBox(imageLocation(response));
                setInput('');
            })
            .catch(err => console.log(err));
    }

    const onRouteChange = (route) => {
        if (route === 'signout') {
            setIsSignedIn(false);
            setInput('');
            setImageUrl('');
            setBox('');
            setRoute('');
            setUser({
                id: '',
                entries: 0,
                name: '',
                email: '',
                joined: ''
            });
        } else if (route === 'home') {
            setIsSignedIn(true);
        }
        setRoute(route);
    }

    return (
        <div className="App">
            <ParticlesBg type="cobweb" bg={true} num={200} color="ffffff" />
            <Navigation onRouteChange={ onRouteChange } isSignedIn={ isSignedIn }/>
            {route === 'home' ? 
                <>
                    <Logo />
                    <Rank entries={ user.entries } name={ user.name }/>
                    <ImageLinkForm onInputChange={ onInputChange } onSubmit={ onSubmit } />
                    <FaceRecognition imageUrl={ imageUrl } box={ box } />
                </>
            :   
            (route === 'signin' || route === 'signout' ? 
                <Signin onRouteChange={ onRouteChange } loadUser={ loadUser }/>
            :
                <Register onRouteChange={ onRouteChange } loadUser={ loadUser }/>
            )}
        </div>
    );
}

export default App;
