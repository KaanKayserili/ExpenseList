import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Pressable, ScrollView, Linking } from 'react-native';

let totalPrice = 0;

let Amounts = [];
let Names = [];
let Categories = [];

let itemIndex = 0;

export default function App() {

  //değer atama state'leri
  const [isim, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");

  //öge ekleme state'leri
  const [expenseItems, setExpenseItems] = React.useState([]);

  const [show, setShow]=React.useState(true);

  const Add = () => {
    if (isim == '' || amount == '' || category == '') {
      alert('Do not leave the Inputs!');
      if(Names.length==0){
        setShow(true);
      }
      else{
          setShow(false);
      }
    }
    else {
      //toplam gideri ekle
      totalPrice += parseInt(amount);

      //diziye elemanı ekle
      Names.push(isim);
      Categories.push(category);
      Amounts.push(amount);
      if(Names.length==0){
        setShow(true);
      }
      else{
          setShow(false);
      }

      //aşağıya ögeyi ekle
      setExpenseItems([...expenseItems, Names[Names.length - 1]]);
      setExpenseItems([...expenseItems, Categories[Categories.length - 1]]);
      setExpenseItems([...expenseItems, Amounts[Amounts.length - 1]]);

      //yukarıdaki formu temizle
      setName('');
      setCategory('');
      setAmount('');
    }
  }

  const Delete = (itemIndex) => {
    //toplam giderden çıkar
    totalPrice -= Amounts[itemIndex];

    //diziden çıkar
    Names.splice(itemIndex, 1);
    Categories.splice(itemIndex, 1);
    Amounts.splice(itemIndex, 1);

    if(Names.length==0){
      setShow(true);
    }
    else{
        setShow(false);
    }
    

    //aşağıdaki ögelerden çıkar
    let itemsCopy = [...expenseItems];
    itemsCopy.splice(itemIndex, 1);
    setExpenseItems(itemsCopy);
  }

  //sürekli olarak ekleyeceğim ögelerin tasarımı
  const Expense = (props) => {

    return (
      <View style={{ borderColor: '#ff6101', borderWidth: 3, borderRadius: 20, padding: 10, marginBottom: 7.5 }}>
        <Text style={{ fontFamily: 'sans-serif', color: 'white', fontSize: 24, flex: 1 }} selectable={false}>{props.key0 + 1}. {props.key1}</Text>
        <Text style={{ fontFamily: 'sans-serif', color: 'white', fontSize: 18, flex: 1 }} selectable={false}>Category: {props.key2}</Text>
        <Text style={{ fontFamily: 'sans-serif', color: 'white', fontSize: 18, flex: 1 }} selectable={false}>Amount: {props.key3}$</Text>
        <Pressable style={{ alignItems: 'flex-end' }} onPress={() => Delete(props.key0)}>
          <Text style={styles.deleteButton}
            selectable={false}
          >Delete</Text>
        </Pressable>
      </View>
    );
  }

  //tasarımın ana yapısı
  return (

    <View style={styles.background}>
      <View style={styles.container}>

        <View style={styles.banner}>
          <StatusBar style="auto"/>
          <Text style={styles.bannerText} selectable={false}>Expense List</Text>
        </View>

        <View style={styles.box1}>
          <Text style={styles.Text} selectable={false}>Add Expense</Text>

          <TextInput
            style={styles.Inputs}
            placeholder='Name of the Expense'
            value={isim}
            onChangeText={isim => setName(isim)} />

          <Picker
            style={styles.Kategori}
            value={category}
            selectedValue={category}
            onValueChange={(category) => setCategory(category)}>
            <Picker.Item label="Choose Category" value="" />
            <Picker.Item label="Bills" value="Bills" />
            <Picker.Item label="Kitchen" value="Kitchen" />
            <Picker.Item label="Cleaning" value="Cleaning" />
            <Picker.Item label="Insurance" value="Insurance" />
            <Picker.Item label="Rent a house" value="Rent" />
            <Picker.Item label="Fuel" value="Fuel" />
          </Picker>

          <TextInput
            style={styles.Inputs}
            placeholder='Amount'
            keyboardType='numeric'
            value={amount}
            onChangeText={amount => setAmount(amount)}
          />

          <Pressable style={styles.addButton} onPress={() => Add()}>
            <Text style={styles.addButtonText} selectable={false}>Add</Text>
          </Pressable>
        </View>

        <View style={styles.Hr} />

        <ScrollView style={styles.box2}>
          <View style={styles.box2Text}>
            <Text style={styles.Text} selectable={false}>Expenses</Text>
            <Text style={styles.TextPrice} selectable={false}>Total: {totalPrice}$</Text>
          </View>

          {show ? (
            <Text style={styles.description}>There aren't expenses.</Text>
          ): null}

          {
            expenseItems.map((item, index) => {
              return (
                //buraya her defada ekleyeceğimiz ögeleri tanımlıyoruz
                <Expense key0={index} key1={Names[index]} key2={Categories[index]} key3={Amounts[index]}></Expense>
              );
            })
          }

        </ScrollView>
        <Text style={styles.footerDesignedBy}>Designed by</Text>
        <Text style={styles.footerText} onPress={() => Linking.openURL('https://www.linkedin.com/in/KaanKayserili')}>Kaan <Text style={{ fontWeight: 'bold' }}>KAYSERİLİ</Text></Text>
      </View>
    </View>
  );
}


//burası CSS
const styles = StyleSheet.create({
  Text: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: 24,
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
  },
  Hr: {
    borderBottomColor: '#ff6101',
    borderBottomWidth: 3,
    borderRadius: 20,
    marginTop: 10,
  },
  background: {
    flex: 1,
    backgroundColor: '#212121',
  },

  container: {
    flex: 1,
    backgroundColor: '#212121',
    borderColor: '#ff6101',
    borderWidth: 5,
    borderRadius: 20,
    margin: 10,
    padding: 25,
  },

  banner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6101',
    borderRadius: 15,
  },

  box1: {
    paddingLeft: 30,
    paddingRight: 30,
  },

  Inputs: {
    height: 50,
    color: 'white',
    borderColor: '#ff6101',
    borderWidth: 3,
    borderRadius: 20,
    paddingLeft: 10,
    fontFamily: 'sans-serif',
    fontSize: 18,
    placeholderTextColor: '#5c5c5c',
    marginBottom: 20,
  },

  Kategori: {
    height: 50,
    borderColor: '#ff6101',
    borderWidth: 3,
    borderRadius: 20,
    fontFamily: 'sans-serif',
    fontSize: 18,
    backgroundColor: '#212121',
    color: '#FFF',
    marginBottom: 20,
    paddingLeft: 10,
  },
  addButton: {
    alignItems: 'flex-end'
  },
  addButtonText: {
    width: 125,
    height: 'auto',
    borderColor: '#ff6101',
    borderWidth: 3,
    borderRadius: 20,
    fontSize: 20,
    fontFamily: 'sans-serif',
    backgroundColor: '#212121',
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1
  },
  bannerText: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: 32,
  },
  box2Text: {
    flexDirection: 'row'
  },
  box2: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  TextPrice: {
    color: '#fff',
    fontFamily: 'sans-serif',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'right',
    flex: 2,
  },
  description: {
    color: 'darkgray',
    marginTop: 60,
    fontFamily: 'sans-serif',
    fontSize: 16,
    textAlign:'center'
  },
  deleteButton: {
    color: 'red',
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'red',
    borderWidth: 3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ff6101',
    fontFamily: 'sans-serif',
  },
  footerDesignedBy: {
    textAlign: 'center',
    fontSize: 8,
    color: '#ff6101',
    fontFamily: 'sans-serif',
  }
});
