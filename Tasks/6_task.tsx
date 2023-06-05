// TASK-6
// The project was prepared before in task-5 for the sixth task by adding json server.

// !Done In this task we will make some useEffect examples to better understand it.
// !Done The first thing is to fetch some data from json server by using fetch api using inside useEffect.
// !Done Make sure that, the api only called once when the products page opened. We have gone through this in our previous lesson i.e.(how can we call the function inside)
// !Done useEffect hook once in a lifetime of the component/page.
// Our second example will be using pagination together with the useEffect hook. As you remember, we have succeeded to perform selective operations among different
// event on the page. So, in this task, you are expected to call the rest api as a result of change in the page number. In each page change, the rest api should be
// called and 10 new products should be populated.
// We also need to integrate this with the filtering mechanism. Filterin mechanism should filter the data from json server accoding to provided text. The api call
// should be made as follows.
// http://localhost:3000/products?productName=Yellow%20Tulip%20Bouquet
// %20 is the representation of the space in url format, so you need to format the product name in the url accordingly
// You can start the json server by the folllowing command in a seperate terminal
// json-server --watch db.json
// if it does not work, try to install the json server in your local project by the following command
// npm install -g json-server
// Bonus mission: try to integrate debounce and throttle to the api call.
// have a nice coding
