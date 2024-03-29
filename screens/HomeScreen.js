import {View, Text, Platform, Touchable, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {styles} from '../theme';

import tw from 'twrnc';
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import {useNavigation} from "@react-navigation/native";
import Loading from "../components/loading";
import {fetchTrendingMovies} from "../api/moviedb";

const ios = Platform.OS == 'ios';
export default function HomeScreen() {

    const [trending, setTrending] = useState([1, 2, 3])
    const [upComing, setUpComing] = useState([1, 2, 3])
    const [topRated, setTopRated] = useState([1, 2, 3])
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        console.log("got trending movies:", data);

        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/*search bar and logo and hamburger*/}
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style='light'/>
                <View className="flex-row justify-between item-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>C</Text>inemate
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>


            {
                loading ? (
                    <Loading/>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>
                        {/* Trending Movies Carousel */}
                        {trending.length > 0 && <TrendingMovies data={trending}/>}

                        {/* Upcoming Movie*/}
                        <MovieList title="Upcoming" data={upComing}/>

                        {/* TopRated Movie*/}
                        <MovieList title="Top Rated" data={topRated}/>
                    </ScrollView>
                )
            }

        </View>
    )
}