let LinkedList = require('linked-list-tsagga');
class HashMap {
  loadFactor = 0.8;
  size = 0;
  hashMap = Array.from({ length: 16 }, () => new LinkedList());

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.hashMap.length;
    }

    return hashCode;
  }

  set(key, value) {
    if (this.hasHighLoadFactor()) this.rebuild();
    const i = this.hash(key);
    // if the key already exists overwrite, else append to Linked List
    let curr = this.hashMap[i].list;
    while (curr) {
      if (curr.key == key) {
        curr.value = value;
        return;
      }
      curr = curr.next;
    }
    this.hashMap[i].prepend(key, value);
    this.size += 1;
  }
  hasHighLoadFactor() {
    if (this.size / this.hashMap.length > this.loadFactor) return true;
    return false;
  }
  rebuild() {
    let entries = this.entries();
    this.clear();
    this.hashMap = Array.from({ length: 32 }, () => new LinkedList());
    entries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }
  get(key) {
    const i = this.hash(key);
    let curr = this.hashMap[i].list;
    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }
    return null;
  }
  has(key) {
    const i = this.hash(key);
    let curr = this.hashMap[i].list;
    while (curr) {
      if (curr.key === key) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }
  remove(key) {
    const i = this.hash(key);

    let curr = this.hashMap[i].list;
    if (curr.key === key) {
      this.hashMap[i].list = curr.next;
      this.size -= 1;
      return true;
    }
    while (curr.next) {
      if (curr.next.key == key) {
        curr.next = curr.next.next || null;
        this.size -= 1;
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  clear() {
    this.hashMap = Array.from({ length: 16 }, () => new LinkedList());
    this.size = 0;
  }
  keys() {
    const result = [];
    for (let i = 0; i < this.hashMap.length; i++) {
      let curr = this.hashMap[i].list;
      while (curr) {
        result.push(curr.key);
        curr = curr.next;
      }
    }
    return result;
  }
  values() {
    const result = [];
    for (let i = 0; i < this.hashMap.length; i++) {
      let curr = this.hashMap[i].list;
      while (curr) {
        result.push(curr.value);
        curr = curr.next;
      }
    }
    return result;
  }
  entries() {
    const result = [];
    for (let i = 0; i < this.hashMap.length; i++) {
      let curr = this.hashMap[i].list;
      while (curr) {
        result.push([curr.key, curr.value]);
        curr = curr.next;
      }
    }
    return result;
  }
}

let test = new HashMap();

test.set('key1', 'value1');
test.set('Tsagga', 'tsagga-val');
test.set('Tsagga', 'new-tsagga-val');
test.set('dog', 'brown');
test.set('key2', 'value1');
test.set('Tsagga2', 'tsagga-val');

console.log(test.get('Tsagga'));
console.log(test.hashMap);
