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
    FB.ui({
        method: 'share',
        href: 'https://semseycesar.github.io/proyecto-1/'
      }, function(response){})
}
);
