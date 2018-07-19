$(document).ready(function () {
    
    hljs.initHighlightingOnLoad();

    var largeHeader = document.getElementById("intro-header");
    var canvas = document.getElementById('backgroundCanvas');
    var dynHeader = new DynamicHeader(largeHeader, canvas);

    BackgroundCheck.init({
            targets: '.intro-header,.navbar',
            images: '.intro-header'
    });
});