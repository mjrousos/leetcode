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
    let combinations = [
        {
            "cost": needs.reduce((acc, numberNeeded, index) => acc + numberNeeded * price[index], 0),
            "specials": []
        }
    ];

    for (let i = 0; i < specials.length; i++) {
        let special = specials[i];

        // Check whether the special can be used
        let needsAfterSpecial = [...needs];
        let specialApplies = true;
        for (let j = 0; j < needs.length; j++) {
            needsAfterSpecial[j] -= special[j];
            if (needsAfterSpecial[j] < 0) {
                specialApplies = false;
                break;
            }
        }
        if (specialApplies)
        {
            // If the special would apply, get all possible combinations and add on the special
            for(let newCombination of getOfferCombinations(price, specials, needsAfterSpecial)) {
                newCombination.cost += special[special.length - 1];
                newCombination.specials.push(i);
                combinations.push(newCombination);
            }
        }
    }

    return combinations;
}
