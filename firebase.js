import {initializeApp} from 'firebase/app'
import {addDoc, getFirestore, collection, getDocs, doc, deleteDoc, orderBy, query, limit,
where, onSnapshot, serverTimestamp, updateDoc} from 'firebase/firestore'
import { LogBox } from 'react-native';
import { getAuth } from 'firebase/auth';

LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])


 const firebaseConfig = {

    apiKey: "AIzaSyBKG5-vG_pBdRdKHX30UYUF9_F7SOt8Co4",
  
    authDomain: "uber-eats-a4c19.firebaseapp.com",
  
    projectId: "uber-eats-a4c19",
  
    storageBucket: "uber-eats-a4c19.appspot.com",
  
    messagingSenderId: "976827322571",
  
    appId: "1:976827322571:web:8ba517048bb9928f938b4e"
  
  };


  export const firebaseApp = initializeApp(firebaseConfig);

  export const auth = getAuth(firebaseApp)

  

  export const db = getFirestore()

  export const restaurantsCol = collection(db, 'restaurants')

  export const ordersCol = collection(db, 'orders')


  export const getOrders = (setOrders)=>{
    
    const orders = []
    const unsuscribe = onSnapshot(ordersCol, (snapshot)=>{

      snapshot.docs.forEach((doc)=>{
         
        if(doc.data().createdAt && doc.data().status === 'pending'){

      //console.log(doc.data().orderId)
      // console.log("eette")
       orders.push(doc.data())
        }


      })
       // console.log(orders)
       setOrders(orders)
    })

  }

 // getOrders()

  //console.log('bonjour')

export const productsCol = collection(db, 'products')

 export const getFoods = ()=>{

  const foods=[]
  
  const q= query(productsCol, orderBy('createdAt', 'desc'))

  return getDocs(q).then(snapshot=>{

     snapshot.docs.forEach((doc) => {

       // console.log(doc.data().createdAt)
        foods.push({...doc.data(), id: doc.id})

      })

      return foods

  })

 }

 export const categoriesCol = collection(db, 'categories')

 export const getCategories = ()=>{

  const categories=[]
  
  //const q= query(categoriesCol, orderBy('createdAt', 'desc'))

  return getDocs(categoriesCol).then(snapshot=>{

     snapshot.docs.forEach((doc) => {

       // console.log(doc.data().createdAt)
       categories.push({...doc.data(), id: doc.id})

      })

      return categories

  })

 }

 //getFoods()

  

 const addProducts = () => {

  getDocs(restaurantsCol)
    .then(snapshot => snapshot.docs.forEach((doc) => {

      doc.data().dishes.forEach((dishe) => {
         
        if('name' in dishe)
        addDoc(productsCol, {
          restaurantID: doc.id,
          ...dishe ,
          createdAt: serverTimestamp()      
        }).then(()=>console.log("ADDED"))

      })

    }))

}

//addProducts()

export const addProduct = (name, description, price) => {

  return addDoc(productsCol, {
    restaurantID: auth.currentUser?.uid,
    name,
    description,
    price,
    createdAt: serverTimestamp()      
  }) 
}


export const getRestaurantId = (uid)=>{

  const q= query(restaurantsCol, where('managerId', '==', uid))

  return getDocs(q)
   
}


export const updateOrder = (order_Id, status, deliveryTime)=>{
  //0AiZlUQoHPIgS91AppRp

  //READY_FOR_PICKUP
  //const docRef = doc(db, 'orders', "0AiZlUQoHPIgS91AppRp")
   
  const docRef = doc(db, 'orders', order_Id)

  updateDoc(docRef, {
     
    status: status,
    deliveryTime: deliveryTime
  })
  .then(()=> console.log('good'))

}

export const updateProduct = (product_id, image)=>{

  const docRef = doc(db, 'products', product_id)

  updateDoc(docRef, {
     
    image: image,
    
  })
  .then(()=> console.log('good'))
}

const getOrder = ()=>{
  getDocs(ordersCol)
  .then(snapshot => {
    console.log(snapshot.docs[0].data())
  })
}

 
