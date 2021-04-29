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

    for(const combination of combinations) {
        console.log(`Could spend ${combination.cost} by buying specials: [${combination.specials}]`);
    }

    // Return the cost of the cheapest combination
    var minCost = Math.min(...combinations.map(c => c.cost));
    console.log(`The minimum cost is $${minCost}`);

    return minCost;
};

function getOfferCombinations(price, specials, needs) {
    // Get the price if no specials are used and initialize the return array with it
    let priceWithoutSpecials = needs.reduce((acc, numberNeeded, index) => acc + numberNeeded * price[index], 0);
    let combinations = [
        {
            "cost": priceWithoutSpecials,
            "specials": []
        }
    ];

    for (let i = 0; i < specials.length; i++) {
        let special = specials[i];

        // Check whether the special can be used
        let numberNeededAfterSpecial = needs.map((numberNeeded, index) => numberNeeded - special[index]);
        if (numberNeededAfterSpecial.every(n => n >= 0))
        {
            // If the special would apply, get all possible combinations and add on the special
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
