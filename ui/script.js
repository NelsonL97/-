window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

//   let p = document.createElement('p');
//   const words = document.querySelector('.words');
//   words.appendChild(p);

  let logo = document.querySelector('.logo');
  let boi = document.querySelector('#boi');
  let enterName = document.querySelector('#nameEntry');
  let nameField = document.querySelector('#name');
  let seconds = document.querySelector('#seconds');

  console.log(nameField)

  let score = 0, isActive = true;

  function count(){
    setInterval(function(){
      if(isActive){
        score++
        console.log(score);
        boi.textContent = boi.textContent + "i";
        seconds.textContent = score;
        boi.style.transform = "rotate(" + score * 25 + "deg";

        //FOR SHAKING BUT EPILIPSY WARNING 
        // let shift0 = Math.floor(Math.random() * score / 10);
        // let shift1 = Math.floor(Math.random() * score / 10);
        // let shift2 = Math.floor(Math.random() * score / 10);
        // let shift3 = Math.floor(Math.random() * score / 10);
        //
        // boi.style.padding = shift0 + "px " + shift1 + "px " + shift2 + "px " + shift3 + "px";

      }else{
        score = 0;
      }

      let rndColor0 = Math.floor(Math.random() * 255);
      let rndColor1 = Math.floor(Math.random() * 255);
      let rndColor2 = Math.floor(Math.random() * 255);
      if (score > 40) {
        boi.style.color = "rgb(" + rndColor0 + "," + rndColor1 + "," + rndColor2 + ")";
        // console.log(rngColor);
      }
    }, 50);
  }

  recognition.addEventListener('result', e => {

    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    const splitTrans = transcript.toLowerCase().split(" ");
    const lastBoi = splitTrans.lastIndexOf("boy");
    const lastYea = splitTrans.lastIndexOf("yeah");
    const refresh = splitTrans.lastIndexOf('refresh');
    const length = splitTrans.length-1;
    console.log(transcript);

    if( lastBoi === length && lastYea === length-1 && lastBoi !== -1 && lastYea !== -1 ){
      boi.textContent = "Boi";
      boi.classList.add("visible");
      enterName.classList.add('visible');
      logo.classList.add('invisible');
      isActive = true;
    }else if(lastBoi >= 0){
        if(refresh === lastBoi+1){
            location.reload();
        }else if(   splitTrans.lastIndexOf("my") === lastBoi+1 &&
                    splitTrans.lastIndexOf("name") === lastBoi+2 &&
                    splitTrans.lastIndexOf("is") === lastBoi+3 &&
                    splitTrans[splitTrans.lastIndexOf("is")+1] !== undefined){
                        nameField.textContent = splitTrans[splitTrans.lastIndexOf("is")+1].charAt(0).toUpperCase() + splitTrans[splitTrans.lastIndexOf("is")+1].slice(1);
                        console.log(splitTrans[splitTrans.lastIndexOf("is")+1]);

        }
    }else if(lastBoi >= 0){}
    else{
      isActive = false;
    }

    // p.textContent = transcript;

    if(e.results[0].isFinal){
      isActive = false
      recognition.stop();
    }
  });

  recognition.continuous = true
  recognition.addEventListener('end', () => {
    recognition.start();
  })
  recognition.start();
  count();
