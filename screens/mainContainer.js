import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import { translations } from "../localization";
import AgendaScreen from "./mainScreens/agendaScreen.js";
import ProfileScreen from "./mainScreens/profileScreen.js";
import SettingsScreen from "./mainScreens/settingsScreen.js";
import MainScreen from "./mainScreens/mainScreen.js";

export default function MainContainer({ route, navigation }) {
    const i18n = new I18n(translations);
    let [locale, setLocale] = useState(Localization.locale);
    i18n.defaultLocale = "en";
    i18n.locale = locale;
    i18n.enableFallback = true;
    const user = {
        id: route.params._id,
        email: route.params.email,
        password: route.params.password,
    };
    const Tab = createMaterialBottomTabNavigator();
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator>
                <Tab.Screen
                    name={i18n.t("home")}
                    component={MainScreen}
                    options={{ tabBarIcon: "home" }}
                />
                <Tab.Screen
                    name={i18n.t("agenda")}
                    component={AgendaScreen}
                    options={{ tabBarIcon: "view-agenda" }}
                />
                <Tab.Screen
                    name={i18n.t("profile")}
                    component={ProfileScreen}
                    options={{ tabBarIcon: "account" }}
                    initialParams={{
                        name: user.name,
                        lastName: user.lastname,
                        email: user.email,
                        phone: user.phone,
                        password: user.password,
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
