import { bubbleSort } from '@coleworsley/sorting-suite';
import { Trie } from '@coleworsley/complete-me';
import dictionary from './dictionary'

const trie = new Trie();

trie.populate(dictionary);

document.getElementById('main').addEventListener('input', function() {
  removeNodes(document.getElementById('list'));
  const input = document.getElementById("main").value;
  const suggestions = trie.suggest(input);

  suggestions.forEach(e => addElement(e));

  document.getElementById('placeholder-input').value = suggestions[0] ? suggestions[0] : "";
});

document.getElementById('placeholder-input').addEventListener('click', () => {
  document.getElementById('main').focus();
});

document.querySelector('ul').addEventListener( "click", someListener );

function someListener(event){
    const element = event.target;

    trie.select(element.textContent);
}

const removeNodes = (node) => {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

const addElement = (text) => {
  const li = document.createElement("li");
  document.getElementById('list').appendChild(li);
  li.textContent = text;
}
