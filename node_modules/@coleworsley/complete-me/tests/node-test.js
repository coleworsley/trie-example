import { expect } from 'chai';
import Node from '../scripts/Node'

describe('Node Test', () => {
  let newNode;

  beforeEach(() => {
    newNode = new Node();
  });

  it('should create a new instance of a node', () => {
    expect(newNode).to.be.instanceof(Node);
  });

  it('should have a null letter by default', () => {
    expect(newNode.letter).to.equal(null);
  });

  it('should have an empty children object by default', () => {
    expect(newNode.children).to.deep.equal({});
  });

  it('should not be a word by default', () => {
    expect(newNode.isWord).to.equal(false);
  });

});
