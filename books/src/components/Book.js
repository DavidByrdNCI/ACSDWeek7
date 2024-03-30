function Book(props) {

    if (props.book.isInEditingMode) {
    return (
        <span>
            Title:
            <input value={props.updateTitle} onChange={props.handleUpdateTitle}/>
            <br/>
            Author:
            <input value={props.updateAuthor} onChange={props.handleUpdateAuthor}/>
            <br />
            Year:
            <input value={props.updateYear} onChange={props.handleUpdateYear}/>
        </span>
    );
    } else {
        return (
            <span>
                <h3>Title: {props.book.title}</h3>
                <h3>Author: {props.book.author}</h3>
                <h3>Year: {props.book.year}</h3>
            </span>
        );
    }
}

export default Book;