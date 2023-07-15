import React, { useState, useEffect } from 'react';
import './App.css';
import angryImage from './angry.png';
import backgroundImage from './background.png';
import axios from 'axios'; // Import axios for making HTTP requests

const ImageContainer = ({ id, image, selectedImageId, setSelectedImageId }) => {
    return (
        <img 
            src={image} 
            className={`image ${selectedImageId === id ? 'selected' : ''}`} 
            onClick={() => setSelectedImageId(id)} 
            alt=""
        />
    );
};

const App = () => {
    const images = new Array(5).fill(angryImage);
    
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [vote, setVote] = useState(null); // Create a state variable for the vote
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to handle button disable

    useEffect(() => {
      // Get the vote variable from your backend
      axios.get('http://localhost:5000/vote') // Replace with your backend URL
        .then(res => setVote(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleVoteButtonClick = () => {
        setIsButtonDisabled(true); // Disable the button to prevent multiple click
        // If an image is selected
        if(selectedImageId !== null){
            axios.post('http://localhost:5000/imageSelected', {
                player: `Player${selectedImageId + 1}`
            })
            .then(function (response) {
                console.log(response);
                if(vote === 'Player6'){
                    window.location.href = 'http://www.example.com';
                }
                else {
                    // Redirect to another page if the vote is not 'you'
                    window.location.href = 'https://www.google.co.jp/';
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => setIsButtonDisabled(false)); // Enable the button after all operations
        } else {
            alert('Please select an image before voting.');
            setIsButtonDisabled(false); // Enable the button if no image was selected
        }
        console.log(vote)
    };

    return (
        <div className="app" style={{backgroundImage: `url(${backgroundImage})`}}>
          <h2 className="top-text">人間だと思われるプレイヤーに</h2>
          <h2 className="bottom-text">投票してください</h2>
            <div className="image-container">
                {images.map((image, index) => (
                    <ImageContainer 
                        key={index} 
                        id={index} 
                        image={image} 
                        selectedImageId={selectedImageId} 
                        setSelectedImageId={setSelectedImageId} 
                    />
                ))}
            </div>
            <button disabled={isButtonDisabled} onClick={handleVoteButtonClick}>
                投票
            </button>
        </div>
    );
};

export default App;
