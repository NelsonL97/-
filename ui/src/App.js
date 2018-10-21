import React, { Component } from 'react';
import styled from 'styled-components';
import css from './app.css';
import space from './space.jpg';
import SpeechRecognition from 'react-speech-recognition'
import gameboi from './GameBoi.png'

const AppBackground = styled.div`
  background: url(${space});
  background-size: cover;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  display: flex;          
  flex-direction: column;  
  justify-content: center; 
  align-items: center;     
  height: 100vh;
  color: white;
`;

const LargeText = styled.span`
  font-size: 100px;
`;

class App extends Component {
  render() {
    const { transcript, resetTranscript, startListening, browserSupportsSpeechRecognition, recognition } = this.props;
    recognition.lang="en"
    // recognition.onend = () => {startListening()};
    console.log(recognition);
    if (!browserSupportsSpeechRecognition) {
      return (<p>Your browser doesn't allow speech recognition</p>)
    }
    return (
      <AppBackground>
        <img src={gameboi}/>
        {/* {console.log(this.props)} */}
        <LargeText>
          {/* YEA BOI */}
          {this.props.interimTranscript}
        </LargeText>
      </AppBackground>
    );
  }
}

export default SpeechRecognition(App);


// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();
// recognition.interimResults = true;

// let p = document.createElement('p');
// const words = document.querySelector('.words');
// words.appendChild(p);

//   recognition.addEventListener('result', e => {
//     console.log(e.results)
//     const transcript = Array.from(e.results)
//     .map(result => result[0])
//     .map(result => result.transcript)
//     .join(''); 

//     p.textContent = transcript;
//     if(e.results[0].isFinal){
//       p = document.createElement('p');
//       words.appendChild(p);
//     }      
//     // console.log(transcript);
//   });
//   recognition.addEventListener('end', recognition. start)
//   recognition.start();