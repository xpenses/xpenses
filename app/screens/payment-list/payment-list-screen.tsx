import React, { useEffect, useMemo, useState } from "react"
import { View, StyleSheet, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { NavigationScreenProps, FlatList } from "react-navigation"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { firestore, getUserApp, firebase } from '../../services/firebase';
import { color, spacing } from "../../theme"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export interface PaymentListScreenProps extends NavigationScreenProps<{}> { }

interface Expense {
  type: 'offline' | 'online',
  amount: number,
  from: string
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export const PaymentListScreen: React.FunctionComponent<PaymentListScreenProps> = props => {

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const nextScreen = useMemo(() => () => props.navigation.navigate("payments"), [
    props.navigation,
  ])


  useEffect(() => {
    (async () => {
      console.log('firebase.apps',firebase.apps);
      const userApp = await getUserApp();
      console.log(userApp);
      const querySnapshot = await userApp.firestore()
        .collection('expenses')
        .get();
      console.log('Total userapp', querySnapshot.size);
      console.log('userapp Documents', querySnapshot.docs[0].data());

      const expenses = [...querySnapshot.docs].map((doc) => {
        let { type, amount, from } = doc.data();
        return { type, amount, from }
      });

      setExpenses(expenses);
    })()
  }, [])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="List of payments" />
        </Text>
        <SafeAreaView style={{ flex: 1 }}>

          <FlatList
            data={expenses}
            renderItem={({ item }) => <Text style={styles.item}>{item.type} | {item.amount} | {item.from}</Text>}
          />
        </SafeAreaView>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="welcomeScreen.continue"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
