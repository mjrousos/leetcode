// https://leetcode.com/problems/n-th-tribonacci-number/

/**
 * @param {number} n
 * @return {number}
 */

var cache = [0, 1, 1];

// Simple recursion, but it's slow due to inefficient
// recursion leading to a lot of duplicated work.
var tribonacci_slow = function(n) {
    switch(n) {
        case 0: 
            return 0;
        case 1:
            return 1;
        case 2:
            return 1;            
        default:
            return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3);
    }
};

// A faster solution benefits from caching, but is not recursive
var cache = [0, 1, 1];
var tribonacci = function(n) {
    for (var i = cache.length; i <= n; i++) {
        cache.push(cache[i - 1] + cache[i - 2] + cache[i - 3]);
    }

    return cache[n];
}

console.log(tribonacci(37));