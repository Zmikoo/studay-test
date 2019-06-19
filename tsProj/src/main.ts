import { sayHello } from './greet';

function showHellow (divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHellow('greeting','TypeScript');

function hello (compiler: string) {
    console.log(`Hello from ${compiler}`);
}
hello('Typescript');