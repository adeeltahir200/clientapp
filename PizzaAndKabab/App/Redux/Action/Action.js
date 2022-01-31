import {DATA_SOURCE, SUBTotal,itemaddedtocart,itemdeletedfromcart} from '../Action/Type';
export const Data = data => {
  return {
    type: DATA_SOURCE,
    payload: data,
  };
};
export const subTotal = data => {
  console.log("i am ",data)
  if(data!=undefined){
  return {type: SUBTotal, payload: data};
}
}

export const additemtocart = (item,qty) =>{
  console.log('The value is :'+item+' my nigga')
  console.log('The value is :'+JSON.stringify(item)+' my nigga and the value of qty is : '+qty)
  return({
    type:itemaddedtocart,
    payload:{
      item:item,
      qty:qty
    },
  })
}

export const deleteitemfromcart = itemid =>{

  return({
    type:itemdeletedfromcart,
    payload:itemid
  })
}