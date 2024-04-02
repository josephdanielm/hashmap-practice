#!/usr/bin/env node

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        if (!this.head) {
            this.head = new Node(value);
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = new Node(value);
    }

    find(value) {
        let current = this.head;
        while (current) {
            if (current.value.key === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    remove(valueToRemove) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === valueToRemove) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
        if (current.next.value === valueToRemove) {
            current.next = current.next.next;
            return;
        }
        current = current.next;
        }
        return null;
    }
}


class HashMap {
    constructor(size = 16){
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => new LinkedList());
        this.keyCount = 0;
    }
    
    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
        }

        return hashCode;
    } 

    set(key, value) {
        const indexAfterHash = this.hash(key);
        this.buckets[indexAfterHash].append({ key, value });
        const potentialNode = this.buckets[indexAfterHash].find(key);
        this.keyCount++;

        
    }

    get(key) {
        const indexAfterHash = this.hash(key);
        const potentialNode = this.buckets[indexAfterHash].find(key);
        if (potentialNode) {
            return potentialNode.value.value;
        } else {
            return null;
        }
    }

    has(key) {
        const indexAfterHash = this.hash(key);
        const potentialNode = this.buckets[indexAfterHash].find(key);
        return potentialNode !== null;
    }

    remove(key) {
        const indexAfterHash = this.hash(key);
        const bucketInParticular = this.buckets[indexAfterHash];
        const potentialNode = this.buckets[indexAfterHash].find(key);

        if (!potentialNode) {
            return false;
        }

        bucketInParticular.remove(potentialNode.value);
        this.keyCount--;
        return true;
    }

    length() {
        return this.keyCount;
    }

    clear() {
        this.buckets = new Array(this.size).fill(null).map(() => new LinkedList());
        this.keyCount = 0;
    }
    
    keys() {
        const keys = [];

        for (const bucket of this.buckets) {
            let current = bucket.head;
            while (current) {
                keys.push(current.value.key);
                current = current.next;
            }
        }
        return keys;
    }

    values() {
        const values = [];

        for (const bucket of this.buckets) {
            let current = bucket.head;
            while (current) {
                values.push(current.value.value);
                current = current.next;
            }
        }
        return values;
    }

    entries() {
        const entries = [];

        for (const bucket of this.buckets) {
            let current = bucket.head;
            while (current) {
                entries.push([current.value.key, current.value.value]);
                current = current.next;
            }
        }
        return entries;
    }
}



// Testing
const myHashMap = new HashMap(10);

myHashMap.set("apple", "red");
myHashMap.set("banana", "yellow");
myHashMap.set("grape", "purple");


console.log("Keys:", myHashMap.keys());
console.log("Values:", myHashMap.values());
console.log("Entries:", myHashMap.entries());
console.log("Length:", myHashMap.length());
console.log("Has 'apple':", myHashMap.has("apple"));
console.log("Has 'orange':", myHashMap.has("orange"));
console.log("Get 'banana':", myHashMap.get("banana"));
console.log("Get 'grape':", myHashMap.get("grape"));
console.log("Remove 'banana':", myHashMap.remove("banana"));
console.log("Keys after removal:", myHashMap.keys());

myHashMap.clear();
console.log("Cleared. Length:", myHashMap.length());