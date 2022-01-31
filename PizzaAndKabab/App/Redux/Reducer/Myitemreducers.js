import { additemtocart, deleteitemfromcart } from '../Action/Action';
import { itemaddedtocart, itemdeletedfromcart } from '../Action/Type';

const INITIAL_STATE = {
    itemsincart: [
        {
            item:'Adeel Tahir',
            qty:3
        }
    ],
};

export const Myitemreducers = (state=INITIAL_STATE, action) =>{

    switch (action.type){
        case(itemaddedtocart):
            console.log('The value recieved by the reducer is : '+action.payload)
            console.log('The state value is : '+JSON.stringify(state))
            return ({...state,itemsincart:[...state.itemsincart,action.payload]})


        default:
            console.log('The default value was called')
            return (state);

    }
}