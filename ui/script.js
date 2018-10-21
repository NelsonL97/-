window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  let logo = document.querySelector('.logo');
  let boi = document.querySelector('#boi');
  let enterName = document.querySelector('#nameEntry');
  let nameField = document.querySelector('#name');
  let seconds = document.querySelector('#seconds');
  let table = document.querySelector('#table');


  let score = 0, isActive = false;

  function count(){
    setInterval(function(){
      if(isActive){
        score++
        boi.textContent = boi.textContent + "iiiii";
        seconds.textContent = score;
      }else{
        score = 0;
      }
    }, 1000);
  }

  recognition.addEventListener('result', async e => {

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
      table.classList.add('visible');
      isActive = true;
    }else if(lastBoi >= 0){
        if(refresh === lastBoi+1){

          if(nameField.textContent.length > 0){
            await axios.post('http://localhost:9090/storeNewRecord', {
              name: nameField.textContent,
              score: parseFloat(seconds.textContent)
            })
          }

          location.reload();

        }else if(   splitTrans.lastIndexOf("my") === lastBoi+1 &&
                    splitTrans.lastIndexOf("name") === lastBoi+2 && 
                    splitTrans.lastIndexOf("is") === lastBoi+3 &&
                    splitTrans[splitTrans.lastIndexOf("is")+1] !== undefined){
                        nameField.textContent = splitTrans[splitTrans.lastIndexOf("is")+1].charAt(0).toUpperCase() + splitTrans[splitTrans.lastIndexOf("is")+1].slice(1);

        }
    }else if(lastBoi >= 0){}
    else{
      isActive = false;
    }

    if(e.results[0].isFinal){
      isActive = false
      e.results = null;
      recognition.stop();
      recognition.start();
    }      
  });

  async function populateLeaderboard(){
    await axios.get('http://localhost:9090/getLeaderboard').then(data => {
      data.data.map((record, index) => {
        let div = document.createElement('tr');
        div.classList.add("row");

        let rank = document.createElement('td');
        rank.textContent = index+1

        let node = document.createElement('td');
        node.textContent = record.name

        let node2 = document.createElement('td');
        node2.textContent = record.score.toString();

        div.appendChild(rank);
        div.appendChild(node);
        div.appendChild(node2);
        table.querySelector('table').querySelector('tbody').appendChild(div);
      });
    })
  }

  recognition.addEventListener('end', () => {
    recognition.start();
  });

  recognition.continuous = true
  recognition.lang = 'en-US';
  recognition.start();
  count();
  populateLeaderboard();