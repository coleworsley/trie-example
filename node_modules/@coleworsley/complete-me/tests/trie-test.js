import { expect } from 'chai';
import Trie from '../scripts/Trie';
import fs from 'fs';
const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie Test', () => {
  let mapleTrie;

  beforeEach(() => {
    mapleTrie = new Trie();
  });

  it('should create a new instance of a trie', () => {
    expect(mapleTrie).to.be.instanceof(Trie);
  });

  describe('Insert Function', () => {
    it('should insert a letter into the trie', () => {
      mapleTrie.insert('h');

      expect(mapleTrie.root.children.h.letter).to.equal('h');

      mapleTrie.insert('i');

      expect(mapleTrie.root.children.i.letter).to.equal('i');
    });

    it('should insert a word into the trie', () => {
      mapleTrie.insert('Hippie');

      expect(mapleTrie.root.children.h.letter).to.equal('h');
      expect(mapleTrie.root.children.h.children.i.letter).to.equal('i');

      mapleTrie.insert('Hi');

      expect(mapleTrie.root.children.
        h.children.
        i.children.
        p.children.
        p.children.
        i.children.
        e.isWord).to.equal(true);

      expect(mapleTrie.root.children.
        h.children.
        i.isWord).to.equal(true);
    });
  });

  describe('Count Function', () => {
    it('should return 0 if there is nothing to count', () => {
      expect(mapleTrie.count()).to.equal(0);
    });

    it('should count the number of complete words in the trie', () => {
      expect(mapleTrie.count()).to.equal(0);

      mapleTrie.insert('Hi');
      mapleTrie.insert('Hill');

      expect(mapleTrie.count()).to.equal(2);

      mapleTrie.insert('Something');
      mapleTrie.insert('Person');
      mapleTrie.insert('someone');

      expect(mapleTrie.count()).to.equal(5);
    });
  });

  describe('Suggest Function', () => {
    it('should return an empty array if there is nothing to suggest', () => {
      const newTrie = new Trie();

      expect(newTrie.suggest('hi')).to.deep.equal([]);
    });

    it('should return an empty array if nothing is suggested', () => {
      const newTrie = new Trie();

      expect(newTrie.suggest()).to.deep.equal([]);
    });

    it('should return an empty array if the input does not exist', () => {
      expect(mapleTrie.suggest()).to.deep.equal([]);
      mapleTrie.insert('test');

      expect(mapleTrie.suggest('tester')).to.deep.equal([]);
    });

    it('should return a suggestion based on the input', () => {
      mapleTrie.insert('Hi');
      mapleTrie.insert('Hill');
      mapleTrie.insert('Hike');
      mapleTrie.insert('Hiker');
      mapleTrie.insert('Hippie');

      expect(mapleTrie.suggest('hi')).to.deep.equal(['hi', 'hill', 'hike', 'hiker', 'hippie']);
    });

    it('should order suggestions when you select one', () => {
      mapleTrie.insert('Hi');
      mapleTrie.insert('Hill');
      mapleTrie.insert('Hike');
      mapleTrie.insert('hiker');
      mapleTrie.insert('him');
      mapleTrie.insert('hitter');
      mapleTrie.insert('might');
      mapleTrie.insert('blight');

      expect(mapleTrie.suggest('hi')).to.deep.equal(['hi', 'hill', 'hike', 'hiker', 'him', 'hitter']);

      mapleTrie.select('hiker');

      expect(mapleTrie.suggest('hi')).to.deep.equal(['hiker', 'hi', 'hill', 'hike', 'him', 'hitter']);
    });

    it('should order suggestions based on the frequency of the node', () => {
      mapleTrie.insert('Hi');
      mapleTrie.insert('Hill');
      mapleTrie.insert('Hike');
      mapleTrie.insert('hiker');
      mapleTrie.insert('him');
      mapleTrie.insert('hitter');

      expect(mapleTrie.suggest('hi')).to.deep.equal(['hi', 'hill', 'hike', 'hiker', 'him', 'hitter']);

      mapleTrie.select('hike');
      mapleTrie.select('hitter');
      mapleTrie.select('hike');

      expect(mapleTrie.suggest('hi')).to.deep.equal(['hike', 'hitter', 'hi', 'hill', 'hiker', 'him']);
    });

  });

  describe('Selection Function', () => {
    it('should have a function for selecting which choice was picked', () => {
      expect(mapleTrie.select).to.be.instanceof(Function);
    });

    it('should be able to increase the frequency of a Node', () => {
      mapleTrie.insert('Hi');
      mapleTrie.select('Hi');

      expect(mapleTrie.root.children.h.children.i.frequency).to.equal(1);
    });
  });

  describe('Work with large Dictionaries', () => {
    const bigTrie = new Trie()

    bigTrie.populate(dictionary);

    it('should populate from an array of words', () => {
      const trie = new Trie();
      const wordArray = ['Hi', 'hello', 'person'];

      expect(trie.count()).to.equal(0);
      trie.populate(wordArray);
      expect(trie.count()).to.equal(3);
    });

    it('should populate a large dictionary', () => {
      expect(bigTrie.count()).to.equal(235886 - 1515);
    });

    it('should return suggestions from a large dictionary', () => {
      expect(bigTrie.suggest('piz')).to.deep.equal([
        "pize",
        "pizza",
        "pizzeria",
        "pizzicato",
        "pizzle"
      ]);
    });

    it('should select words', () => {
      bigTrie.select('apply');

      expect(bigTrie.root.children.a.children.p.children.p.children.l.children.y.frequency).to.equal(1);
    });

    it('should return an empty array with an invalid input', () => {
      expect(bigTrie.suggest('afewofijawefn')).to.deep.equal([]);
    });

    it('should order words by the frequency selected', () => {
      const keyword = 'zebu';

      expect(bigTrie.suggest(keyword)).to.deep.equal([ 'zebu', 'zebub', 'zebulunite', 'zeburro' ]);

      bigTrie.select('zeburro');

      expect(bigTrie.suggest(keyword)).to.deep.equal([ 'zeburro', 'zebu', 'zebub', 'zebulunite']);

      bigTrie.select('zebulunite');
      bigTrie.select('zeburro');
      bigTrie.select('zeburro');
      bigTrie.select('zebulunite');

      expect(bigTrie.suggest(keyword)).to.deep.equal([ 'zeburro', 'zebulunite', 'zebu', 'zebub']);

    });
  });

  it('check the dictionary for duplicates', () => {
    const dictionaryObj = dictionary.reduce((acc, word) => {
      word = word.toLowerCase();
      if (!acc[word]) {
        acc[word] = 0;
      }
      acc[word]++;

      return acc;
    }, {});

    const duplicates = Object.keys(dictionaryObj).filter(word => {
      if (dictionaryObj[word] > 1) {
        return word;
      }
    });

    expect(duplicates.length).to.equal(1515);
  });
});
