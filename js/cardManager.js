var cardManager = (function(){ 

    //añade un hijo al elemento de la cara frontal de la carta, con el numero de la carta
    function showNumber(card, number, backgroundColor){
        cardBack = card.childNodes[0].childNodes[1];
        if(cardBack.childNodes[0]) return;
        array  = card.getAttribute('id').split('-');
        cardBack.appendChild(createH1Element(number));
        cardBack.style.backgroundColor = backgroundColor;
        card.childNodes[0].classList.add("fliping");
    }

    //retorna el index de la carta en la matriz
    function getIndexCard(card){ 
        indexCard = card.getAttribute('id').split('-');
        return [parseInt(indexCard[1]), parseInt(indexCard[2])]
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
        return card;
    }

    function createH1Element(text) {
        var h = document.createElement("H1");
        var t = document.createTextNode(""+text);
        h.appendChild(t);
        
        return h;
    }

    return{
        createCard: createCard,
        getIndexCard: getIndexCard,
        showNumber: showNumber,
        hideNumber: hideNumber
    }
})();