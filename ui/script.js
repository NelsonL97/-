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
        console.log(score);
        boi.textContent = boi.textContent + "i";
        seconds.textContent = score;
        // boi.img.style = "width: 5em, height: 5em";

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

      let rndColor0 = Math.random() * 255;
      let rndColor1 = Math.random() * 255;
      let rndColor2 = Math.random() * 255;

      if (score > 30 && boi.classList.contains("visible")) {
        boi.style.transform = "rotate(" + score * 25 + "deg)";
        boi.style.color = "rgb(" + rndColor0 + "," + rndColor1 + "," + rndColor2 + ")";
        nameField.style.color = "rgb(" + rndColor0 + "," + rndColor1 + "," + rndColor2 + ")";


        // console.log(rngColor);
      }
    }, 50)

    setInterval(function() {
        let posX = Math.random() * 100;
        let posY = Math.random() * 100;

        if (score > 30) {
            let spongeBoi = document.createElement("div");
            spongeBoi.style.background = "url('SpongeBob Boi.png')";
            spongeBoi.style.backgroundSize = "contain";
            spongeBoi.style.backgroundRepeat = "no-repeat";
            spongeBoi.style.width = "100px";
            spongeBoi.style.height = "150px";
            spongeBoi.style.position = "absolute";
            spongeBoi.style.top = posX + "%";
            spongeBoi.style.left = posY + "%";
            document.querySelector("#spongeBoi").appendChild(spongeBoi);
        }
    }, 750)

    ;
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
