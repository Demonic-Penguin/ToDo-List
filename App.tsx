import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Button, View, StyleSheet, SafeAreaView, Text } from "react-native";

import { Amplify } from "aws-amplify";

import outputs from "./amplify_outputs.json";

import {
  Authenticator,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react-native';

// import awsconfig from './aws-exports.json';

Amplify.configure(outputs);
// Amplify.configure(awsconfig);

const MyAppHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return (
    <View>
      <Text style={{ fontSize: fontSizes.xxxl, padding: space.xl }}>
        ToDo
      </Text>
    </View>
  );
};

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function App() {
  const {
    tokens: { colors },
  } = useTheme();

  return (
    <Authenticator.Provider>
      <Authenticator
        // will wrap every subcomponent
        Container={(props) => (
          // reuse default `Container` and apply custom background
          <Authenticator.Container
            {...props}
            style={{ backgroundColor: colors.pink[20] }}
          />
        )}
        // will render on every subcomponent
        Header={MyAppHeader}
      >
        <View style={style.container}>
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;