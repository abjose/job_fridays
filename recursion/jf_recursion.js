
// recursively  nth number of fibonacci sequence
function fib(n) {
    if (n === 0 || n === 1)
	return 1
    else
	return fib(n-1) + fib(n-2);
}

// (lame) test
if (fib(10) === 89)
    console.log("fibonacci passed");
else
    console.log("fibonacci FAILED");


// recursively find largest number in a list
function max(numbers, largest_so_far) {
    // apparently can't directly set default values?
    largest_so_far = largest_so_far || 0;
    // if used up all our numbers, return
    if (numbers.length === 0)
	return largest_so_far;
    // now see if current number is larger than 'saved' one
    next_num = numbers[0];
    // if so, recurse with new number; otherwise keep old one
    if (next_num > largest_so_far) {
	return max(numbers.slice(1), next_num);
    } else {
	return max(numbers.slice(1), largest_so_far);
    }
}

// test
if (max([3, 2, 60, 18, 61, 28, 5]) === 61)
    console.log("max passed");
else
    console.log("max FAILED");


// sum list recursively
function sum_rec(numbers, sum) {
    // give default value...
    sum = sum || 0;
    // then accumulate max
    if (numbers.length === 0)
	return sum;
    return sum_rec(numbers.slice(1), sum + numbers[0]);
}

// test
if (sum_rec([1, 1, 5, 5, 2, 6, 2, 8]) === 30 &&
    sum_rec([]) === 0)
    console.log("sum_rec passed");
else
    console.log("sum_rec FAILED");


// recursively find the index of the last occurrence of a given number
// assumes no values of 'undefined' in the middle of the list...
function lastIndexOf(value, list, index) {
    // assign default value
    index = index || 0;

    // base case: empty array (ASSUMES NO UNDEFINED VALUES IN ARRAY!)
    if (list[index] === undefined)
	// we've run out of values! so return -1
	return -1;
    
    // case: find a match
    if (list[index] === value)
	// this index is worth saving - return it or anything we find later on
	return Math.max(index, lastIndexOf(value, list, index+1));
    
    // case: don't find a match -- just keep going
    return lastIndexOf(value, list, index+1);
}

// test
if (lastIndexOf(5, [1, 2, 4, 6, 5, 2, 7])    ===  4,
    lastIndexOf(5, [1, 2, 4, 6, 2, 7])       === -1,
    lastIndexOf(5, [1, 2, 5, 4, 6, 5, 2, 7]) ===  5)
    console.log("lastIndexOf passed");
else
    console.log("lastIndexOf FAILED");


// recursively generate all the reorderings of a set of letters
function letterPermutations(letters, substring) {
    // default value
    substring = substring || ""

    // if no letters left, return substring
    if (letters === "")
	return [substring];

    // otherwise, branch
    var list = [];
    // hmmm, could probably avoid this loop
    // could just pass index, but that would make things less readable...
    for (var i=0, len=letters.length; i < len; i++) {
	// slice out current letter
	sliced_letters = letters.slice(0,i) + letters.slice(i+1,letters.length);
	// find things 
	list = list.concat(letterPermutations(sliced_letters,
					      substring+letters[i]));
    }
    return list;
}

// ...javascript doesn't have a built-in factorial function?
function fac(n) {
    if (n <= 1)
	return 1;
    return n*fac(n-1);
}
// or array comparison?
function list_eq(l1, l2) {
    if (l1.length !== l2.length)
	return false
    for (var i=0; i < l1.length; i++)
	if (l1[i] !== l2[i])
	    return false
    return true
}

// test
if (list_eq(letterPermutations("hi"), ["hi", "ih"]) &&
    fac("hello".length) === letterPermutations("hello").length)
    console.log("letterPermutations passed");
else
    console.log("letterPermutations FAILED");
	

/* A child is running up a staircase with n steps, and can hop either
1 step, 2 steps, or 3 steps at a time. Write a function that, given
the length of the staircase, tells you how many ways there are to go
up the steps.  */

function step_plan(steps) {
    // if exactly 0 steps left, found a successful plan! didn't if less than 0
    if (steps === 0) return 1;
    if (steps < 0) return 0;
    // each time can take 1, 2, or 3 steps
    return step_plan(steps-1) + step_plan(steps-2) + step_plan(steps-3); 
}

// how to test?

/* How many ways are there for a taxi driver to get from the top left
of a grid city to the bottom right? The city is exactly 10 blocks in
each direction, all streets are two ways, and you know the city well
enough that you'd balk if the driver actually drove away from the
goal - so never up or left, only right and down.  */

function taxi_plan(r, c, blocks) {
    // set defaults
    r = r || 0;
    c = c || 0;
    blocks = blocks || 10;

    // if at goal, count
    if (r === blocks && c === blocks)
	return 1;
    // if out-of-bounds, fail
    if (r > blocks || c > blocks)
	return 0;
    
    // otherwise, drive
    return taxi_plan(r+1, c, blocks) + taxi_plan(r, c+1, blocks);
}

// binomial coefficient
function binomial(n, k) {
    return (fac(n)) / (fac(n-k)*fac(k))
}

if (binomial(2*10, 10) === taxi_plan(0,0,10))
    console.log("taxi_plan passed");
else
    console.log("taxi_plan FAILED");


/* How many different ways can we make change of $1.00, given
half-dollars, quarters, dimes, nickels, and pennies? More generally,
can we write a procedure to compute the number of ways to change any
given amount of money?  */
function make_change(change_types, value) {
    // change_Types should be a list of available coins, like [1, 5, 10, 25, 50]
    // ehh, this is almost identical to the step-jumping problem...
}
