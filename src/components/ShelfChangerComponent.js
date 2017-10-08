import React, { Component }  from 'react';
import * as Books from '../BooksAPI';

class ShelfChanger extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedOption: this.props.shelf
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
   this.setState({selectedOption: event.target.value});
 }

  handleSubmit(event) {
   alert('Your selected ' + this.state.value);
   event.preventDefault();
   Books.update(this.props.book, this.state.selectedOption).then((result) => {
     console.log(result);
   })
 }

  render(){
    let { selectedOption } = this.state.selectedOption;

    return (
      <div className="book-shelf-changer">
        <form onSubmit={this.handleSubmit}>
         <label>
          Select the category that you want to move to.
          <select value={selectedOption} onChange={this.handleChange}>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
         </label>
         <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default ShelfChanger;
