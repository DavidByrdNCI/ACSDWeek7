import { useState, useEffect } from 'react';
import axios from 'axios';
import Book from "./Book"

function BooksList(params) {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateAuthor, setUpdateAuthor] = useState("");
    const [updateYear, setUpdateYear] = useState("");

    function handleInputTitle(e) {
        e.preventDefault();
        setTitle(e.target.value);
    }

    function handleInputAuthor(e) {
        e.preventDefault();
        setAuthor(e.target.value);
    }

    function handleInputYear(e) {
        e.preventDefault();
        setYear(e.target.value);
    }

    // create
    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post("http://localhost:8080/", {title: title, author: author, year: year});
        setTitle("");
        setAuthor("");
        setYear("");
    }

    // read 
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async function () {
        var incomingData = await axios.get("http://localhost:8080/");
        var formattedData = incomingData.data.books.map(function (book) {
            return {
                id: book.id,
                title: book.title,
                author: book.author,
                year: book.year,
                isInEditingMode: false
            }
        })
        setBooks(formattedData);
        console.log(formattedData);
    }


    // update
    async function handleUpdate(e, i) {
        e.preventDefault();
        await axios.put("http://localhost:8080/", {book_id: i.id, title: updateTitle, author: updateAuthor, year: updateYear});
        setUpdateTitle("");
        await getBooks();
    }

    function handleEdit(e, id) {
        e.preventDefault();
        var booksArray = [...books];
        var iIndex = books.indexOf(books.find(
            function (book) {
                return book.id === id;
            }
        ));
        booksArray[iIndex].isInEditingMode = true;
        setUpdateTitle(booksArray[iIndex].title);
        setUpdateAuthor(booksArray[iIndex].author);
        setUpdateYear(booksArray[iIndex].year);
    }

    function handleUpdateTitle (e) {
        e.preventDefault();
        setUpdateTitle(e.target.value);
    }

    function handleUpdateAuthor (e) {
        e.preventDefault();
        setUpdateAuthor(e.target.value);
    }

    function handleUpdateYear (e) {
        e.preventDefault();
        setUpdateYear(e.target.value);
    }


    // delete
    async function handleDelete(e, id) {
        e.preventDefault();
        await axios.delete("http://localhost:8080/", {data: {book_id: id}});
        await getBooks();
    }

    return (
        <div>
            Title:
            <input value={title} onChange={handleInputTitle}/>
            <br/>
            Author:
            <input value={author} onChange={handleInputAuthor}/>
            <br/>
            Year:
            <input value={year} onChange={handleInputYear}/>
            <br/>
            <button onClick={handleSubmit}>Add Book</button>
            <ul>
                {books.map(function (i, index) {
                    if (i.isInEditingMode) {
                        return (
                            <li key={index}>
                                <Book book={books[index]}
                                handleUpdateTitle={handleUpdateTitle}
                                updateTitle={updateTitle} 
                                handleUpdateAuthor={handleUpdateAuthor}
                                updateAuthor={updateAuthor}
                                handleUpdateYear={handleUpdateYear}
                                updateYear={updateYear}/>

                                <button onClick={function (e) {
                                    handleDelete(e, i.id)
                                    }}>Delete</button>
                                
                                <button onClick={function (e) {
                                    handleUpdate(e, i)
                                }}>Done</button>
                            </li>
                        );
                    } else {
                        return (
                            <li key={index}>
                                <Book book={books[index]} />
                                <button onClick={function (e) {
                                    handleDelete(e, i.id)
                                    }}>Delete</button>
                                <button onClick={function (e) {
                                    handleEdit(e, i.id)
                                }}>Update</button>
                            </li>
                        );
                    }
                    
                })}
            </ul>
        </div>
    );
}


export default BooksList;