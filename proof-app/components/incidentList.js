import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Song from './incident';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const SongList = ({ itemList}) => (
    <View style={styles.container}>
        
        <FlatList
                data={itemList}
                renderItem={({ item }) => <Song
                    name={item.name}
                    album={item.album}
                    artist={item.artist} 
                    timestamp={item.timestamp}
                    
                />}
            />

    </View>
);

export default SongList;