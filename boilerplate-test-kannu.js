/**
 Write an utility that group all items by the property `type` and return the sum of each group by the `price` property. Only if the item has more than 3 cart `items` multiply the price with the `orderFactor`.

 Acceptance criteria
 - Have to work on latest version of Chrome and NodeJS.
 - Should not block the progress
 - Latest ecmascript specifications


 Extra question (please write the answer)
 - What do you have to do to make this utility running on IE 11

 *
 *
 * @param cartItems [{
         type: String,
         title: String,
         description: String,
         firstname: String,
         lastname: String,
         price: Number | undefined,
         tax: Number | undefined,
         items: [
             {
                 picture: String,
                 price: Number,
                 tax: Number,
                 description: String,
             }
         ],
         orderFactor: Number | undefined
     }
     , ... ]
 *
 * @return
 * [{type: String, sum: Number}, ...] |
 * Promise<[{type: String, sum: Number}, ...]>
 */
let _ = require('lodash');
/**
 * Group items on basis of cart item type.
 * @param {*} dataToCollectOn
 * @param {*} fieldNameToCollectOn
 * @param {*} fieldNameForCollectionName
 * @param {*} fieldNameForChildren
*/
function item_preparation(dataToCollectOn, fieldNameToCollectOn, fieldNameForCollectionName, fieldNameForChildren) {

let result = _.chain(dataToCollectOn)
       .groupBy(fieldNameToCollectOn)
       .toPairs()
       .map(function (currentItem) {
          return _.zipObject([fieldNameToCollectOn, fieldNameForChildren], currentItem);
       })
       .value();
   return result;
}

/**
 * It perform calculations on price after checking containing items are more than 3 or not.
 * @param {*} cartItems 
 */
async function price_calculation_on_item_collaboration (cartItems) {
let amount_arr_for_item_collaboration = [];
cartItems.forEach((cartItem) => {
    if (cartItem) {
        let amt = 0;
        let records    = cartItem['cartGrouped'];
        records.forEach((record) => {
            console.log(record);
            let item_amt = record.price;
            if (record.items.length > 3) {
                item_amt =  record.price *  record.orderFactor;
            }
            amt = amt + item_amt;
        });
        amount_arr_for_item_collaboration.push({'sum':amt,'type':cartItem['type']});
    }
});
return amount_arr_for_item_collaboration;
}

module.exports.cart_preparation = function(cart_obj, callback) {
    //Preparing items for cart.
    (async () => {
        try {
            let item_preparation_output = await item_preparation(cart_obj.cart_list, 'type', 'type', 'cartGrouped');
            // calculate the output data.
            let item_preparation_output_result = await price_calculation_on_item_collaboration(item_preparation_output);
            callback(null, item_preparation_output_result);
        }  catch (e) {
            console.error(e);
        }
    })();
}