/* eslint-disable no-unused-vars */
const testArray = [1, 2, 3, 4, 5, 1, 5, 8, 9];

const getUniqueElements = (array) => {
    let uniqueElements = new Set(array);
    return Array.from(uniqueElements);
}

getUniqueElements(testArray);
// console.log(getUniqueElements(testArray)); // [1, 2, 3, 4, 5, 8, 9]

// const date = new Date();
// console.log(date.toLocaleDateString('en-US', { weekday: 'long' })); // Monday


let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
};

let json = JSON.stringify(student);
// console.log(json);

// --------------------------------------------------------------------------
// Given a 32-bit signed integer, reverse its digits. If the reversal results 
// in a value that falls outside the range of signed 32-bit integers, which 
// is between -2^31 and 2^31 - 1, then return 0.

function reverseInteger(digits) {
    const copyOfDigits = digits.toString().split('').reverse().join('');
    return (copyOfDigits <= Math.pow(2, 31) - 1 && copyOfDigits >= Math.pow(-2, 31)) ? copyOfDigits : 0;

}
console.log(reverseInteger(123)); // 321

// --------------------------------------------------------------------------
// Palindrome Number
// Determine whether an integer is a palindrome. An integer is a palindrome
// when it reads the same backward as forward.

function isPalindrome(x) {
    const copyOfX = x.toString().split('');
    const reversedX = copyOfX.reverse().join('');
    return x === parseInt(reversedX) ? true : false;
}

// --------------------------------------------------------------------------
// Swap pairs in a linked list
// Given a list, swap every two adjacent elements and return the new list.
// input = [1, 2, 3, 4, 5]
// output = [2, 1, 4, 3, 5]
function swapPairs(list) {
    let modifiedList = structuredClone(list);
    for (let i = 0; i < modifiedList.length; i += 2) {
        if (modifiedList[i + 1] === undefined) {
            break;
        }
        let tempValue = modifiedList[i];
        modifiedList[i] = modifiedList[i + 1];
        modifiedList[i + 1] = tempValue;
    }
    return modifiedList;
}

console.log(swapPairs([1, 2, 3, 4, 5])); // [2, 1, 4, 3, 5]

// --------------------------------------------------------------------------
// Implement a function to efficiently find all pairs in an array that sum up to 
// a specific target value.
