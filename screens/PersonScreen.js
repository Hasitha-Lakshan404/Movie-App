import {View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image} from "react-native";
import React, {useState} from 'react'
import {styles, theme} from "../theme";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {HeartIcon} from "react-native-heroicons/solid";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';
export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false)
    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>

            {/*Back Button*/}
            <SafeAreaView
                className={"z-20 w-full flex-row justify-between items-center px-4 " + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background}
                                  className="rounded-xl p-1">
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size="35" color={isFavourite ? 'red' : "white"}/>
                </TouchableOpacity>
            </SafeAreaView>

            {/*Person Details*/}
            <View>
                <View className="flex-row justify-center">
                    <View className="items-center rounded-full overflow-hidden w-72 h-72 border-2 border-neutral-500"
                          style={{
                              shadowColor: 'gray',
                              shadowRadius: 40,
                              shadowOffset: {width: 0, height: 5},
                              shadowOpacity: 1,
                              borderRadius: 100,
                              elevation: 80,
                              overflow: 'hidden'
                          }}
                    >
                        <Image
                            source={require('../assets/images/actor.jpg')}
                            style={{height: height * 0.43, width: width * 0.74}}
                        />
                    </View>
                </View>

                <View>
                    <View className="mt-6">
                        <Text className="text-3xl text-white font-bold text-center">Tessa Young</Text>
                    </View>
                    <Text className="text-base text-neutral-500 text-center">London, United Kingdom</Text>
                </View>
            </View>
        </ScrollView>
    )
}