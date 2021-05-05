// https://leetcode.com/problems/shopping-offers/

/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
var shoppingOffers = function(price, special, needs) {

    // Get all possible valid combinations of specials
    let combinations = getOfferCombinations(price, special, needs);

    // A little diagnostic logging
    for(const combination of combinations) {
        console.log(`Could spend ${combination.cost} by buying specials: [${combination.specials}]`);
    }

    // Return the cost of the cheapest combination
    var minCost = Math.min(...combinations.map(c => c.cost));
    console.log(`The minimum cost is $${minCost}`);

    return minCost;
};

// Get all possible ways of purchasing a given number of items
// Returns an array of { "cost": number, "specials": number[] }
function getOfferCombinations(price, specials, needs) {
    // Get the price if no specials are used and initialize the return array with it
    let priceWithoutSpecials = needs.reduce((acc, numberNeeded, index) => acc + numberNeeded * price[index], 0);
    let combinations = [
        {
            "cost": priceWithoutSpecials,
            "specials": []
        }
    ];

    // Iterate through all available specials
    for (let i = 0; i < specials.length; i++) {
        let special = specials[i];

        // See how many needs are left if we apply the special
        let numberNeededAfterSpecial = needs.map((numberNeeded, index) => numberNeeded - special[index]);

        // If the special could be used (no needs went negative), find all the ways that the *remaining*
        // needs can be purchased.
        if (numberNeededAfterSpecial.every(n => n >= 0))
        {
            // If the special would apply, recurse and find all combinations to buy
            // the remaining items and then add on the price for the special used
            let specialPrice = special[special.length - 1];
            for(let newCombination of getOfferCombinations(price, specials, numberNeededAfterSpecial)) {
                newCombination.cost += specialPrice;
                newCombination.specials.push(i);
                combinations.push(newCombination);
            }
        }
    }

    return combinations;
}

shoppingOffers([2,5], [[3,0,5],[1,2,10]], [3,2]);
