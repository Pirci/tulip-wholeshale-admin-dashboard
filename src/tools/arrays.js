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
// console.log(reverseInteger(123)); // 321

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

// console.log(swapPairs([1, 2, 3, 4, 5])); // [2, 1, 4, 3, 5]

// --------------------------------------------------------------------------
// Implement a function that takes an array of integers and a target value and 
// returns a pair of elements that their sum is equal to target value.

function twoSum(array, target) {
    let pairCollection = []
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (target === array[i] + array[j]) {
                pairCollection.push([array[i], array[j]]);
            }
        }
    }
    return pairCollection;
}

const result = twoSum([1, 2, 3, 4, 5, 6], 9); // [4, 5]
// console.log(result);

// --------------------------------------------------------------------------
// Implement a function to find the first missing positive integer in an 
// unsorted array.

function findMissingPositiveInteger(array) {
    const positiveIntegers = array.filter(val => val > 0);
    const sortedArray = positiveIntegers.sort((a, b) => a - b);
    // for (let num of sortedArray) {
    //     if (!sortedArray.includes(num + 1) && num < sortedArray[sortedArray.length - 1]) {
    //         return num + 1;
    //     }
    // }
    for (let i = 0; i < sortedArray.length; i++) {
        if (!(sortedArray[i + 1] - sortedArray[i] === 1)) {
            return sortedArray[i] + 1;
        }
    }
    return -1;
}
const exampleArray = [3, 6, 1, 2, 7, 8, 11, 10, 9, 5, -1, -2, -3, 0];
const missingValue = findMissingPositiveInteger(exampleArray);
// console.log(missingValue);

// --------------------------------------------------------------------------
//Implement a function to find the top K frequent elements in an array.

function findMostFrequentElement(array) {
    const uniqueSet = new Set(array);
    let mostFrequentElement = array[0];
    for (let num of uniqueSet) {
        const lengthOfItems = array.filter((val) => val === num).length;
        if (lengthOfItems > mostFrequentElement) {
            mostFrequentElement = num
        }
    }
    return mostFrequentElement;
}

const frequentValue = findMostFrequentElement([1, 1, 2, 5, 2, 2, 5, 6, 7, 4, 4, 2, 3, 2, 2, 1]);
console.log(frequentValue);

// --------------------------------------------------------------------------
//Implement a function to find the top K frequent elements in an array. 


// --------------------------------------------------------------------------
// Implement a function to perform an in-place shuffle of an array so that no element 
// appears in its original position.


// --------------------------------------------------------------------------
// Implement a function to find the maximum product of any three integers in an array.


// --------------------------------------------------------------------------
//   Implement a function to flatten a nested array in JavaScript.