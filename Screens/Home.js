import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const Home = () => {
    return (
        <View style={styleHome.body}>
            <View style={styleHome.toolbar}>
                <Image style={styleHome.toolbarLogo} source={require('../media/logo.png')} />
                <TouchableOpacity style={styleHome.noti}>
                    <Image style={styleHome.toolbarLogo} source={require('../media/thongbao.png')} />
                </TouchableOpacity>
            </View>
            <View style={styleHome.searchContainer}>
                <TouchableOpacity>
                    <Image style={style.icon} source={require('../media/search.png')} />
                </TouchableOpacity>
                <TextInput placeholder="Search" style={style.textInput} />
                <TouchableOpacity>
                    <Image style={style.icon} source={require('../media/loc.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styleHome = StyleSheet.create({
    noti: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        elevation: 10
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    body: {
        padding: 24,
        backgroundColor: 'while',
        width: '100%',
        height: '100%'
    },
})