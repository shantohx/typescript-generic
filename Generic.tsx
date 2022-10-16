// It's a simple javascript function that takes 2 values and returns two function
// to get and set those values
function makePair() {
    // Stores a pair of values
    let pair: { first: number; second: number }
    function getPair() {
      return pair
    }
    // Stores x as first and y as second
    function setPair(x: number, y: number) {
      pair = {
        first: x,
        second: y
      }
    }
    return { getPair, setPair }
}

// Let's create the same function in TypeScript generic function
function genericMakePair<T>() {
    let pair : { first: T; second: T }
    function getPair() {
        return pair
    }
    function setPair(x: T, y: T) {
        pair = {
            first: x,
            second: y
        }
    }
    return { getPair, setPair }
}

// In the previous function, we can't change the type of variables.
// Generic functions provides the scope to use the same function for 
// different types. 

// This creates a pair of string
const a = genericMakePair<string> ()
a.setPair("Hello", "World");

// This creates a pair of int
const b = genericMakePair<number> ()
b.setPair(1, 2);

// Someone may try to make a pair of bool as well. But we may not want to give
// access to that. We can restrict the use of type by extends which restricts the
// domain of inputs
function genericMakePair2<T extends string | number>() {
    let pair : { first: T; second: T }
    function getPair() {
        return pair
    }
    function setPair(x: T, y: T) {
        pair = {
            first: x,
            second: y
        }
    }
    return { getPair, setPair }
}

// Both the function mentioned needs to define a type when we call them.
// We can also define a default type of the generic function which can be called without
// any type and will be of default type.
function genericMakePair3<T extends number | string = number>() {
    let pair : { first: T; second: T }
    function getPair() {
        return pair
    }
    function setPair(x: T, y: T) {
        pair = {
            first: x,
            second: y
        }
    }
    return { getPair, setPair }
}
// c by default becomes a pair of number
const c = genericMakePair3()

// In case we wanted to use different types for each value
function genericMakePair4<T, S>() {

}
// We can apply each rule mentioned above
function genericMakePair5<T extends number| string, S extends number | T>() {
    // while T can either be number or string, S can only be number or Type of T 
    let pair : { first: T, second: S }
}

// On the other hand, we could declare a interface for pair which could be 
// reused every time we wanted to create a pair.
interface Pair<A, B> {
    // By extracting into a generic interface (an interface that takes type 
    // parameters) we can reuse it in other places if necessary.
    first : A,
    second : B
}

function makePairUsingInterface<F, S>() {
    let pair : Pair<F, S>
}

// Generic Class : To use it, You need to set "strictPropertyInitialization": false 
// on TypeScript config (tsconfig.json) to get the class code to compile.
class State<T, S> {
    state : Pair<T, S>

    getState() {
        return this.state
    }
    
    setState(x: T, y : S) {
        this.state.first =  x
        this.state.second = y
    }
}

export default State