import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { updateOrder } from '../firebase'
import { APP_CONSTANT } from '../global'
import Menus from '../components/Menus'
import Divider from '../components/Divider'
import UserDetails from '../components/UserDetails'
import ConfirmModal from '../components/ConfirmModal'
import {ButtonFoodDone} from '../components/OrderInProgressDetail'

export default function OrderDetails({route}) {
    const {order} = route.params 
    const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
        <UserDetails order={order}/>

        <View style={styles.divider}></View>
        <Menus order={order}/>
        {/* <Divider /> */}
     { !route.params.orderInProgress?<View style={styles.buttons}>
          <TouchableOpacity onPress={()=>{
           //  updateOrder(order.id, APP_CONSTANT.CONFIRM)
           setModalVisible(true)
          }}>
              <View style={{
                  ...styles.button,
                  backgroundColor: "#00ff00"
              }}>
                  <Text style={styles.text}>Confirm</Text>
              </View>
          </TouchableOpacity>
          
          <TouchableOpacity>
              <View style={{
                  ...styles.button,
                  backgroundColor: "#cc0000",
          
              }}>
                  <Text style={styles.text}>Decline</Text>
              </View>
          </TouchableOpacity>
      </View>
      :
      <ButtonFoodDone />}
      <ConfirmModal order={order} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
       // marginHorizontal: 20,
        flex: 1
    },

    divider: {
       height: 15,
       backgroundColor: "#e6e6e6"
    },
    buttons: {
      //marginTop: 40
      position: "absolute",
      bottom: 10,
      width: "100%"
    },
   button: {
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20
    
   } ,
   text: {
      padding: 15,
      fontSize: 22,
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: 5,
      color: "#e6e6e6"
   }
})