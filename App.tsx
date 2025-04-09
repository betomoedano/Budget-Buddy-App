import * as React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Payment from "./screens/sheets/Payment";

const Stack = createNativeStackNavigator();

// const loadDatabase = async () => {
//   const dbName = "mySQLiteDB.db";
//   const dbAsset = require("./assets/mySQLiteDB.db");
//   const dbUri = Asset.fromModule(dbAsset).uri;
//   const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

//   const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
//   if (!fileInfo.exists) {
//     await FileSystem.makeDirectoryAsync(
//       `${FileSystem.documentDirectory}SQLite`,
//       { intermediates: true }
//     );
//     await FileSystem.downloadAsync(dbUri, dbFilePath);
//   }
// };

export default function App() {
  // const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   loadDatabase()
  //     .then(() => setDbLoaded(true))
  //     .catch((e) => console.error(e));
  // }, []);

  // if (!dbLoaded)
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <ActivityIndicator size={"large"} />
  //       <Text>Loading Database...</Text>
  //     </View>
  //   );
  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        <SQLiteProvider
          databaseName="mySQLiteDB.db"
          useSuspense
          assetSource={{
            assetId: require("./assets/mySQLiteDB.db"),
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "Budget Buddy",
                headerLargeTitle: true,
                headerTransparent: Platform.OS === "ios" ? true : false,
                headerBlurEffect: "light",
              }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{
                presentation: "transparentModal",
                animation: "slide_from_bottom",
                animationTypeForReplace: "pop",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}
