import '../scss/main.scss';

/* svg */
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('../img/icons/', true, /\.svg$/));

fetch(`../img/icons/icons.svg`).then(res => {
  return res.text();
}).then(data => {
  document.querySelector('.icons').innerHTML = data;
});

console.log('test');