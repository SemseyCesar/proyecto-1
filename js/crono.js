var crono = (function(){
    var segundos= 1;
    var minutos= 0;
    var cronometro;

    
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

    function timeToString(){
        str_min = minutos < 10 ? "0"+minutos : ""+minutos;
        str_seg = segundos < 10 ? "0"+segundos : ""+segundos;
        return str_min+":"+str_seg;
    }

    return{
        start: start,
        stop: stop,
        timeToString: timeToString,
    }
})();
