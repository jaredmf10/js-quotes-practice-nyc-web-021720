let quoteList = document.getElementById("quote-list")
function doesMyFetch(){
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then((response) => {
        return response.json();
      })
      .then((quotes) => {
          console.log(quotes)
          quotes.forEach(quote => {
              let newLi = document.createElement('li')
              newLi.classname = 'quote-card'
              newLi.innerHTML = `
            <blockquote class="blockquote">
            <p class=${quote.id}>${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>
              `
            quoteList.appendChild(newLi)
          });
        })
}
doesMyFetch()

let newQuoteForm = document.getElementById("new-quote-form")

newQuoteForm.addEventListener("submit", function(event){
    event.preventDefault()
    let newQuote = document.getElementById("new-quote")
    let newAuthor = document.getElementById("author")
    let newObj = {quote: newQuote.value, author: newAuthor.value, likes: [{}]}
    // console.dir(newQuote)
    let newLi = document.createElement('li')
        newLi.classname = 'quote-card'
        newLi.innerHTML = `
            <blockquote class="blockquote">
            <p class=${newQuote.id -1}>${newQuote.value}</p>
            <footer class="blockquote-footer">${newAuthor.value}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>
            `
        quoteList.appendChild(newLi)
    fetch('http://localhost:3000/quotes', {
    method: 'POST',
    body: JSON.stringify({
    completed: true
    }),
    headers: {
    "Content-Type": "application/json",
     "Accept": "application/json"
    },
    body: JSON.stringify(newObj)
    })
})

document.addEventListener("click", function (event){
    if(event.target.className === "btn-danger"){
        let deleteTarget = event.target.parentElement.parentElement
        deleteTarget.remove()
        // console.dir(event.target.parentElement.children[0].className)
        let id = event.target.parentElement.children[0].className
        fetch(`http://localhost:3000/quotes/${id}`,{
        method: 'DELETE'
        })
    }else if(event.target.className === "btn-success"){
        if(event.target.innerText === "Likes: 0"){
        console.dir(event.target)
        event.target.dataset.likes = "Likes: "
        event.target.dataset.score = 1
        event.target.innerText = `${event.target.dataset.likes}${event.target.dataset.score}`
        }else {
            event.target.innerText = `${event.target.dataset.likes}${event.target.dataset.score++}`
        }
    }
})