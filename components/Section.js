// Section class renders a list of elements 

export default class Section {
    constructor({ data, renderer }, cardElement) {
        this._renderedItems = data; 
        this._renderer = renderer;
        this._container = document.querySelector(cardElement);
    }

    renderItems() {
        this._renderedItems.foreach(items => this._renderer(items));
    }

    addItems(element) {
        this._container.prepend(element);
    }
}
// 1. It has an object with two properties (items and renderer) as the first parameter of the constructor. 
//The items property serves as an array of data, which you need to add on a page when initializing the class. 
//The renderer property is a function responsible for creating and rendering data on a page.
// 2. The second parameter should be a CSS class selector where you'll add the card elements.
// 3. It stores a public method that renders all elements on the page. The renderer() function will render each element on a page.
// 4. It stores a public method named addItem() that takes a DOM element and adds it to the container.

//The Section class doesn't have markup. It receives markup through the callback function and inserts it in the container.
