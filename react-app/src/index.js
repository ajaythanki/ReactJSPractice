import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Counter from "./components/counter";
import Vidly from "./components/vidly";
ReactDOM.render(<Vidly />, document.getElementById("root"));
serviceWorker.unregister();

// import { Teacher } from './teacher';
// const element = <h1>Hello world!</h1>;
// console.log(element);
// ReactDOM.render(element, document.getElementById("root"));

// const colors = ['red','green','blue'];
// const list = colors.map(color => `<li>${color}</li>`);
// console.log(list);

// const country = {
//     street:'abcd',
//     city:'xxx',
//     pin:'123'
// }

// console.log(`contry obj: ${country}`);

// const {street, city, pin} = country;
// console.log(`Street var: ${street}`);
// console.log(`City var: ${city}`);
// console.log(`Pin var: ${pin}`);

// const teacher = new Teacher('ajay','bca');
// teacher.teach();
