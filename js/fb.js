window.fbAsyncInit = function() {
    FB.init({
      appId            : '284445025892616',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v7.0'
    });
  };

console.log(document.getElementById('btn-share'));
document.getElementById('btn-share').addEventListener('click',() =>{
    min = document.getElementById('min').textContent;
    seg = document.getElementById('seg').textContent;
    document.getElementById('fb-title').setAttribute('content','My time is: '+ min+seg);
    FB.ui({
        method: 'share',
        href: 'https://semseycesar.github.io/proyecto-1/',
        name: 'My time '+min+":"+seg+" :D",
      }, function(response){})
}
);
