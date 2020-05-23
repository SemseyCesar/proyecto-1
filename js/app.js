var juego = (function(){ 
    var SIZE = 4;
    var TOTAL_PAIRS = Math.floor(SIZE*SIZE / 2);
    var matrix = [...Array(SIZE*SIZE).keys()].map( j => j % TOTAL_PAIRS);
    var selectedCard = null;

    //theme
    var darkTheme = false;
    var offsetLum  = 20;

    //crono
    var segundos= 0;
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
                card = createCard(i,j);
                col.appendChild(card);
            }
            tablero.appendChild(row);
        }
    }


    //crea un elemento carta con el id card-i-j donde i j son los indices en la matriz
    function createCard(i, j){
        var card= Object.assign(document.createElement("div"),{id:"card-"+i+"-"+j, className:"flip-card"});
        var flipper = Object.assign(document.createElement("div"),{id:"fliper-"+i+"-"+j, className:"fliper"});
        card.appendChild(flipper);
        var cardFront = Object.assign(document.createElement("div"),{id:"front-"+i+"-"+j, className:"card-front"});
        var cardBack = Object.assign(document.createElement("div"),{id:"back-"+i+"-"+j, className:"card-back"});
        flipper.appendChild(cardFront);
        flipper.appendChild(cardBack);
        cardFront.appendChild(createH1Element("?"));
        card.addEventListener("click", onClickCard);
        return card;
    }


    function createH1Element(text) {
        var h = document.createElement("H1");
        var t = document.createTextNode(""+text);
        h.appendChild(t);
        
        return h;
    }

    //este metodo lo que hace restringir los click una vez sobre la misma carta,
    // ademas de no poder seleccionarla dos veces
    // y la pone boca arriba
    function onClickCard(){
        this.removeEventListener('click', onClickCard,false);
        if(selectedCard == this)
            return;
        this.addEventListener("transitionend", onTransitionEnd);
        showNumber(this);
    }


    //este metodo es llamada cuando una carta fue elegida
    //si no hay carta seleccionada previa(que este boca arriba), queda la carta como seleccionada
    // si existe una carta seleccionada, entonces las compara el par
    // si son iguales entonces par se descarta el par de la matriz, y quedan para siempre boca arriba-
    // si no se vuelve  aponer boca abajo
    function onTransitionEnd(){
        this.removeEventListener('transitionend',onTransitionEnd,false);
        if(selectedCard) 
            if (getNumberCard(selectedCard) ==  getNumberCard(this)){
                parAcertado(this,selectedCard)
                selectedCard = null;
            }
            else{
                hideNumber(selectedCard);
                hideNumber(this);
                selectedCard = null;
            }
        else
            selectedCard = this;
    }

    //elimina el hijo del elemento de la cara frontal de la carta,
    // para que el dom no revele el numero de la carta
    function hideNumber(card){
        card.childNodes[0].classList.remove("fliping");
        card.addEventListener('transitionend', removeBackground);
        cardBack = card.childNodes[0].childNodes[1];
        cardBack.removeChild(cardBack.childNodes[0]);
    }

    //elimina el background 
    // hice esto para que no apareciera en el dom el color de cada carta ya que 
    // esto revelaria el valor de la carta(cada carta tiene un color distinto)
    function removeBackground(){
        this.removeEventListener('transitionend',removeBackground,false);
        this.childNodes[0].childNodes[1].style.backgroundColor="";
        this.addEventListener("click", onClickCard);
    }


    //añade un hijo al elemento de la cara frontal de la carta, con el numero de la carta
    function showNumber(card){
        cardBack = card.childNodes[0].childNodes[1];
        if(cardBack.childNodes[0]) return;
        array  = card.getAttribute('id').split('-');
        number = matrix[ parseInt(array[1]) * SIZE + parseInt(array[2])];
        cardBack.appendChild(createH1Element(number));
        cardBack.style.backgroundColor = "hsl("+ Math.floor(355 / TOTAL_PAIRS) * number +",100%,"+ (50 + offsetLum) +"%)";
        card.childNodes[0].classList.add("fliping");
    }

    //marca en la matriz los index asociado a card1 y card2 como correctos en la matriz
    // chequea si son todos correctos, en caso de ser correcto el juego termino
    // caso contrario: no pasa nada se sigue jugando
    function parAcertado(card1, card2)
    {
        indexCard1 = card1.getAttribute('id').split('-');
        indexCard2 = card2.getAttribute('id').split('-');
        matrix[parseInt(indexCard1[1]) * SIZE + parseInt(indexCard1[2])] = 'X';
        matrix[parseInt(indexCard2[1]) * SIZE + parseInt(indexCard2[2])] = 'X';
        
        if(matrix.every((x) => x == 'X'))
            win();
    }

    //dado un elemento carta retorna el numero de esa carta
    function getNumberCard(card){     
        return matrix[getIndexCard(card)];
    }

    //retorna el index de la carta en la matriz
    function getIndexCard(card){ 
        indexCard = card.getAttribute('id').split('-');
        return parseInt(indexCard[1]) * SIZE + parseInt(indexCard[2])
    }

    //ordena de manera aleatoria la matriz
    function shuffle() {
        matrix.sort(() => Math.random() - 0.5);
    }

    function toggleDarkTheme(){
        if(darkTheme)
        {
            document.getElementById('theme').classList.toggle('invert');
            document.body.style.background = "";
            offsetLum = 20;
        }
        else{
            document.getElementById('theme').classList.toggle('invert');
            document.body.style.background = "#23272a";
            offsetLum = 0;
        }
        darkTheme = !darkTheme;
        window.localStorage.setItem('darkTheme',darkTheme);
    }

    function win(){
        stop();
        document.getElementById('btn-retry').addEventListener('click', () =>{ location.reload()});
        body = document.createTextNode("your time is: "+minutos+":"+segundos);
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
        togleDarkTheme: toggleDarkTheme,
    }
})();

window.onload = function(){
    
    document.getElementById('theme').addEventListener('click', () => {juego.togleDarkTheme()});
    document.getElementById('btn-start').addEventListener('click',() => {juego.start()});

    $('#welcome-modal').modal();    
    juego.shuffle();
    juego.generarTablero();


    // carga de temas
    colorPredef = window.localStorage.getItem('colorCard');
    darkPredef = window.localStorage.getItem('darkTheme');
    if(darkPredef == "true")
        juego.togleDarkTheme();
    if(colorPredef)
        $('.card-front').addClass(colorPredef);
    else
         $('.card-front').addClass('green-card');

    themesConfig = [
        {button: 'color-green' , theme: 'green-card'},
        {button: 'color-red' , theme: 'red-card'},
        {button: 'color-blue' , theme: 'blue-card'},
    ]
    initButtonsColorCard(themesConfig);
}

function changeColorCards(themeColor, themes){
    window.localStorage.setItem('colorCard',themeColor);
    $('.card-front').addClass(themeColor);
    otherThemes = themes.filter( t => t != themeColor);
    $('.card-front').removeClass(otherThemes.join(' '));
}

function initButtonsColorCard(themesConfig){
    themes = themesConfig.map(i => i.theme);
    themesConfig.forEach(
        item => 
            document.getElementById(item.button).addEventListener('click',() =>{
                changeColorCards(item.theme, themes);
            })
        )
}