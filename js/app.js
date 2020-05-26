window.onload = function(){
    //preparar juego
        juego.shuffle();
        juego.generarTablero();
    
        //ThemeManager
    themeManager.loadThemeFromLocalStorage();
    themesConfig = [
        {button: 'color-green' , theme: 'green-card'},
        {button: 'color-red' , theme: 'red-card'},
        {button: 'color-blue' , theme: 'blue-card'},
    ]
    themeManager.initButtonsColorCard(themesConfig);
    themeManager.initButtonsDarkTheme();

    //show welcome modal
    $('#welcome-modal').modal();    
    

    juego.activateButtonStart();
}
