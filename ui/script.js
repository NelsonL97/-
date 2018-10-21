window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  let p = document.createElement('p');
  const words = document.querySelector('.words');
  words.appendChild(p);

  let logo = document.querySelector('.logo');
  let boi = document.querySelector('#boi');

  let score = 0, isActive = false;

  function count(){
    setInterval(function(){
      if(isActive){
        score++
        console.log(score);
        boi.textContent = boi.textContent + "iiiii";
      }else{
        score = 0;
      }
    }, 1000);
  }

  recognition.addEventListener('result', e => {

    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(''); 

    const lastBoi = transcript.split(" ").lastIndexOf("boy");
    const lastYea = transcript.split(" ").lastIndexOf("yeah");
    const refresh = transcript.split(" ").lastIndexOf('refresh');
    const length = transcript.split(" ").length-1;
    console.log(transcript);

    if( lastBoi === length && lastYea === length-1 && lastBoi !== -1 && lastYea !== -1 ){
      boi.textContent = "Boi";
      boi.classList.add("visible");
      logo.classList.add('invisible');
      isActive = true;
    }else if(lastBoi >= 0 && refresh > 0){
      location.reload();
    }
    else{
      isActive = false;
    }

    p.textContent = transcript;

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