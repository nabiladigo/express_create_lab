class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }

    /**
     * @description It will take an array as a argument 
     * @returns on Object that contains the { id as a key } and { te item as the value } 
     */

    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }

    #generateId(){
        return ++this.#currentId
    }

    /**
     * @description Will return an array with all items availible in this.items
     * @returns array
     */

    find() {
        return Object.values(this.#items);
    }

    /**
     * @description Will return item match with the itemId
     * @param { string } itemId
     * @param { function } callBack Will return error or item
     * @returns function;
     */

    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }
    create( data, callBack ) {
        if (!data) return console.log("missing data in first argument");
    
        if (typeof callBack !== "function") {
          return console.log("missing function in second argument");
        }
    
        let error, newItem;
    
        const isEmpty = Object.keys(data).every(field => data[field] === "");
    
        if (isEmpty) {
          error = { message: `you have empty fields` };
        } else {
          
          newItem = new this.#Model( data, this.#generateId());
    
          this.#items[newItem.id] = newItem;
        }
    
        return callBack(error, newItem);
      }
};

class Product {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
    }
}



module.exports = new Collection(Product, [
    { 
        name: "Car", 
        price: 20000, 
        image: "https://cdn.motor1.com/images/mgl/vrRzY/s1/bugatti-chiron-alice.jpg",  
      },
      { 
        name: "Cat", 
        price: 100, 
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=640:*",
      },
      { 
        name: "Crab", 
        price: 2, 
        image: "https://cdna.artstation.com/p/assets/images/images/004/329/884/large/jude-perera-final-crab-gamma1-5.jpg?1482506485",
      },
      { 
        name: "Crib", 
        price: 200, 
        image: "data:image/jpeg;base64,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"
      },
      { 
        name: "Coat", 
        price: 200, 
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29hdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1296&q=60"
      },
      { 
        name: "Cake", 
        price: 3, 
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=1296&q=60"
      },
      { 
        name: "Concussion", 
        price: 0, 
        image: "https://images.unsplash.com/photo-1518746624987-db396fa6ebd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29uY3Vzc2lvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1296&q=60"
      },
      { 
        name: "Coal", 
        price: 1, 
        image: "https://images.unsplash.com/photo-1602037348227-c874695ca678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1296&q=60"
      },
      { 
        name: "Cyclone", 
        price: 70000, 
        image: "https://media.istockphoto.com/photos/powerful-tornado-on-road-in-stormy-landscape-picture-id697333214?b=1&k=20&m=697333214&s=170667a&w=0&h=ISNokk0jlsfKbLX9o4gvROaRRPVvsOBTnjqQAy-Eh9w="
      },
      { 
        name: "Career", 
        price: 13500, 
        image: "https://media.istockphoto.com/photos/cyber-security-web-development-and-work-in-it-concept-picture-id1289411982?b=1&k=20&m=1289411982&s=170667a&w=0&h=0R3OXR4L6LOGphYA3sul4bWQwpGj_DSl05ENiP2kRZg="
         },
      { 
        name: "Cillian Murphy", 
        price: 400, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFfhdMPWQ-4etrGUJ4mvch1JuXBfnUimXsW8MGt_pk5SW6B3E-NYiXLNaeoNiLolfml-c&usqp=CAU"
      },
      { 
        name: "Climate Change", 
        price: 9, 
        image: "data:image/jpeg;base64,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" 
      }
  ]);