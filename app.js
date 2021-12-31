// Toggle Loading
const toggleLoading = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//Toggle Search
const toggleSearch = displayStyle => {
    document.getElementById('books').style.display = displayStyle;
}
const searchBook = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const errorDiv = document.getElementById('error');
    toggleLoading('block');
    toggleSearch('none');
    //clear search text
    searchField.value = '';

    // condition apply
    if (searchText === '') {
        errorDiv.innerText = 'Please Type your favorite book name.';
    }

    // data load
    const url = ` https://openlibrary.org/search.json?q=${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    displaySearchResult(data.docs);
    // console.log(data);

    // error handling
    if (data.massage === "Not Found") {
        errorDiv.innerText = "NO Result Found";
    }
    else {
        errorDiv.innerText = '';
    }

};


//   Display Search Result

const displaySearchResult = async books => {

    document.getElementById('total-found').innerHTML = `
 <h1 class="text-center text-info"> A total of  ${books.length} Books</h1>`;

    const searchResult = document.getElementById('search-result');
    // clear text content
    searchResult.textContent = '';

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
         <div class="card h-100">
         <img src= 'https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' class="card-img-top" alt="...">
    <div class="card-body">
        <h2 class="card-title">Book Name:${book.title}</h2>
        <h4> Athor Name: ${book.author_name}</h4>
         <p> Publisher Name: ${book.publisher}</p>
         <h5>First Publish year: ${book.first_publish_year}</h5>
    </div>
    </div>`
        searchResult.appendChild(div)
    });
    // Toggle Loading & Search
    toggleLoading('none');
    toggleSearch('block');
};




