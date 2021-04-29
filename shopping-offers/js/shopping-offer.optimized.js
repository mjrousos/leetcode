// https://leetcode.com/problems/shopping-offers/

/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
var shoppingOffers = function(price, special, needs) {
    return Math.min(...getOfferCombinations(price, special, needs).map(c => c.cost));
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
        let needsAfterSpecial = [];
        let specialApplies = true;
        for (let j = 0; j < needs.length; j++) {
            needsAfterSpecial.push(needs[j] - special[j]);
            if (needsAfterSpecial[j] < 0) {
                specialApplies = false;
            }
        }
        if (specialApplies)
        {
            // If the special would apply, get all possible combinations and add on the special
            let specialPrice = special[special.length - 1];
            for(let newCombination of getOfferCombinations(price, specials, needsAfterSpecial)) {
                newCombination.cost += specialPrice;
                newCombination.specials.push(i);
                combinations.push(newCombination);
            }
        }
    }

    return combinations;
}
