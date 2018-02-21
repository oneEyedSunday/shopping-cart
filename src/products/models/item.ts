export interface ItemInterface {
  name: string;
  price: number;
  _id?: string;
  imageUrl?: string;
  description?: string;
}

export interface ItemInCartInterface  {
  id: number;
  quantity: number
}

export class Item {
  name: string;
  price: number;
  id: number;

  public static ids = [];

  constructor(name: string, price: number, id?:number){
    if(name && price){
      this.name = name, this.price = price;
    }

    if(id){
      if(Item.ids.indexOf(id) > -1){
        throw new Error("Id already exists");
      }
      this.id = id;
    }else {
      if(Item.ids.length < 1 ){
        this.id = 1;
      }else{
      this.id  = Item.ids[Item.ids.length - 1] + 1;
    }

    }
    Item.ids.push(this.id);
    // console.log("Length is ", Item.ids.length);
    // console.log("creating new Item");
    // console.log(this);
  }


}
