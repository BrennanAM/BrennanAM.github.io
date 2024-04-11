document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector("#js-new-quote");
    btn.addEventListener('click', getQuote);
});

async function getQuote() {
    loading(true); 
    try {
        const response = await fetch('https://type.fit/api/quotes');
        if (!response.ok) {
            throw Error(response.statusText);
        }

        const quotes = await response.json();
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quote = randomQuote.text;
        const author = randomQuote.author || "Unknown"; 

        displayQuote(quote, author);
    } catch (err) {
        console.error(err);
        alert('Failed to fetch new quote');
    } finally {
        loading(false); 
    }
}

function displayQuote(quote, author) {
    const quoteText = document.querySelector('#js-quote-text');
    const authorText = document.querySelector('#js-author-text');

    quoteText.textContent = `"${quote}"`;
    authorText.textContent = `— ${author}`;

    const tweetText = `${quote} — ${author}`;
    updateTweetButton(tweetText);
}

function updateTweetButton(quote) {
    const tweetBtn = document.querySelector('#js-tweet');
    tweetBtn.href = `https://twitter.com/home`;
}

function loading(isLoading) {
    const loadingIndicator = document.querySelector("#loading");
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

getQuote();
