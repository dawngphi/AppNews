import { View, Text } from 'react-native'
import React, {useState, useContext, createContext} from 'react'

export const NewsContext = createContext();
export const NewsProvider = (props) => {
    const { children } = props;
    const [data, setData] = useState([]);
    return (
        <NewsContext.Provider value={{data, setData}}>
            {children}
        </NewsContext.Provider>

    )
}
