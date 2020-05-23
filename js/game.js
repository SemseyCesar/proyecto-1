var juego = (function(){ 
    var SIZE = 4;
    var TOTAL_PAIRS = Math.floor(SIZE*SIZE / 2);
    var matrix = [...Array(SIZE*SIZE).keys()].map( j => j % TOTAL_PAIRS);
    var selectedCard = null;


    //crono
    var segundos= 1;
    var minutos= 0;
    var cronometro;

    //crea el tablero
    function generarTablero(){
        var tablero = document.getElementById("tablero");
        for(var i =0; i<SIZE; i++)
        {
            var row = Object.assign(document.createElement("div"),{id:"row-"+i, className:"d-flex flex-row"});
            for(var j = 0; j<SIZE; j++)
            {
                var col = Object.assign(document.createElement("div"),{id:"col-"+i+"-"+j, className:"col padding-0 col-tablero"});
                row.appendChild(col);
                card = cardManager.createCard(i,j);
                card.addEventListener("click", onClickCard);
                col.appendChild(card);
            }
            tablero.appendChild(row);
        }
    }

    //este metodo lo que hace restringir los click una vez sobre la misma carta,
    // ademas de no poder seleccionarla dos veces
    // y la pone boca arriba
    function onClickCard(){
        this.removeEventListener('click', onClickCard,false);
        if(selectedCard == this)
            return;
        this.addEventListener("transitionend", onTransitionEnd);
        number = getNumberCard(this);
        cardManager.showNumber(this, number, themeManager.bgColorCard(number, TOTAL_PAIRS));
    }


    //este metodo es llamada cuando una carta fue elegida
    //si no hay carta seleccionada previa(que este boca arriba), queda la carta como seleccionada
    // si existe una carta seleccionada, entonces las compara el par
    // si son iguales entonces par se descarta el par de la matriz, y quedan para siempre boca arriba-
    // si no se vuelve  aponer boca abajo
    function onTransitionEnd(){
        this.removeEventListener('transitionend',onTransitionEnd,false);
        if(selectedCard) 
            if (getNumberCard(this) ==  getNumberCard(selectedCard)){
                parAcertado(getIndexCard(this), getIndexCard(selectedCard))
                selectedCard = null;
            }
            else{
                cardManager.hideNumber(selectedCard);
                cardManager.hideNumber(this);
                this.addEventListener('click', onClickCard);
                selectedCard.addEventListener('click', onClickCard);
                selectedCard = null;
            }
        else
            selectedCard = this;
    }

    function getIndexCard(card){
        indexIJ = cardManager.getIndexCard(card);
        return indexIJ[0] * SIZE + indexIJ[1];
    }

    function getNumberCard(card){
        return matrix[getIndexCard(card)]
    }

    //marca en la matriz los index asociado a card1 y card2 como correctos en la matriz
    // chequea si son todos correctos, en caso de ser correcto el juego termino
    // caso contrario: no pasa nada se sigue jugando
    function parAcertado(card1, card2)
    {
        matrix[card1] = 'X';
        matrix[card2] = 'X';
        if(matrix.every((x) => x == 'X'))
            win();
    }


    //ordena de manera aleatoria la matriz
    function shuffle() {
        matrix.sort(() => Math.random() - 0.5);
    }

    function activateButtonStart(){
        document.getElementById('btn-start').addEventListener('click',() => {juego.start()});
    }
    function win(){
        stop();
        document.getElementById('btn-retry').addEventListener('click', () =>{ location.reload()});
        str_min = minutos < 10 ? "0"+minutos : ""+minutos;
        str_seg = segundos < 10 ? "0"+segundos : ""+segundos;
        body = document.createTextNode("your time is: "+str_min+":"+str_seg);
        document.getElementById('modal-body-win').appendChild(body);
        $('#win-modal').modal();
    }

    function stop(){
        clearInterval(cronometro);
    }

    function start(){
        segElement = document.getElementById('seg');
        minElement = document.getElementById('min');
        cronometro = window.setInterval(
            function(){
                if(segundos == 60){
                    segundos=0;
                    minutos++;
                    minElement.innerHTML = minutos < 10 ? "0" + minutos : minutos;
                }
                segElement.innerHTML = segundos < 10 ? "0" + segundos : segundos;
                segundos++;
            },1000
        );
    }

    return{
        start: start,
        shuffle: shuffle,
        generarTablero:generarTablero,
        activateButtonStart: activateButtonStart,
    }
})();