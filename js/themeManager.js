var themeManager = (function(){

    darkTheme = false;
    offsetLum = 0;

    function loadThemeFromLocalStorage(){
        colorPredef = window.localStorage.getItem('colorCard');
        darkPredef = window.localStorage.getItem('darkTheme');
        console.log("color= ",colorPredef);
        if(darkPredef == "true")
            toggleDarkTheme();
        if(colorPredef)
            $('.card-front').addClass(colorPredef);
        else
            $('.card-front').addClass('green-card');
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

    function initButtonsDarkTheme(){
        document.getElementById('theme').addEventListener('click', () => {themeManager.toggleDarkTheme()});
    }
    
    function bgColorCard(number, totalPairs){
        return "hsl("+ Math.floor(355 / totalPairs) * number +",100%,"+ (50 + offsetLum) +"%)";
    }
    return{
        initButtonsDarkTheme: initButtonsDarkTheme,
        initButtonsColorCard: initButtonsColorCard,
        loadThemeFromLocalStorage: loadThemeFromLocalStorage,
        toggleDarkTheme: toggleDarkTheme,
        bgColorCard: bgColorCard,
    }
})();