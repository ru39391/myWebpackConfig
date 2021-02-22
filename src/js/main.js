import '../scss/main.scss';
import exampleData from '../img/Svg.svg';

// let h2 = document.querySelector('h2');
// console.log(h2.textContent);

console.log(exampleData);
const usage = `<svg viewBox="${exampleData.viewBox}"><use xlink:href="${exampleData.url}"></use></svg>`;
