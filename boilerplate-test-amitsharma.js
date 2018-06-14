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
 * It perform calculations on price after checking containing items are more than 3 or not.
 * @param {*} cart_items
 * @param {*} item_name_to_collect_on
 * @param {*} fieldNameForCollectionName
 * @param {*} fieldNameForChildren
*/
function invoice_generation_steps(cart_items, item_name_to_collect_on, fieldNameForCollectionName, fieldNameForChildren) {

let cart_item_collection = _.chain(cart_items)
       .groupBy(item_name_to_collect_on)
       .toPairs()
       .map(function (currentItem) {
           return _.zipObject([item_name_to_collect_on, fieldNameForChildren], currentItem);
       }).value();
let amount_arr_for_item_collaboration = [];
    cart_item_collection.forEach((cartItem) => {
        if (cartItem) {
            let amt = 0;
            let records    = cartItem['group_items'];
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

module.exports.invoice_generate = function(cart_obj, callback) {
    //Preparing items for cart.
    (async () => {
        try {
            let item_preparation_output = await invoice_generation_steps(cart_obj.cart_list, 'type', 'type', 'group_items');
            callback(null, item_preparation_output);
        }  catch (e) {
            console.error(e);
        }
    })();
}