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