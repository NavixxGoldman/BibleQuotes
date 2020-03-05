let quotesData 
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: 'https://gist.githubusercontent.com/NavixxGoldman/f085e8a9a27eb2c0803b3fd9c1b140d5/raw/6343b719026403b5e7e82cc3a24dfe31946ebd67/quotes.json',
    success: function(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

//random function
function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote(){
  let randomQuote=getRandomQuote();
  currentQuote=randomQuote.quote;
  currentAuthor=randomQuote.author;
  $(".quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#text').text(currentQuote);
    }
  );
    $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#author').text(currentAuthor);
    }
  );
}

$(document).ready(function(){
  $.ajaxSetup({ cache: true });
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '202202870841106',
      version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    });     
 
  });
  $("#tweet-quote").on('click',function(){
    FB.ui({
    display: 'popup',
    method: 'share',
    href: 'https://eloquent-lewin-0cced4.netlify.com/',
    hashtag: 'BibleQuotesGasy',
    quote: currentQuote+''+currentAuthor
  }, function(response){});
   /* window.open('https://twitter.com/intent/tweet?text='+ currentQuote +" "+ "-" +currentAuthor)*/
  });
  getQuotes().then(()=>{
    getQuote();
  });
  
  $('#new-quote').on('click',getQuote);
 
});
/*
*/
