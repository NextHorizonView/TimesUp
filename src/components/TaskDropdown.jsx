import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TaskDropdown = ({ categories, selectedCategory, setCategoryIndex, isLight }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <Dropdown
                style={[styles.dropdown, isLight && { borderColor: 'white' }]}
                placeholderStyle={[styles.placeholderStyle, isLight && { color: 'white' }]}
                selectedTextStyle={[styles.selectedTextStyle, isLight && { color: 'white' }]}
                itemTextStyle={styles.itemTextStyle}
                data={categories}
                maxHeight={300}
                labelField="name"
                valueField="id"
                iconStyle={styles.iconStyle}
                placeholder={!isFocus ? 'Select item' : '...'}
                value={selectedCategory}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCategoryIndex(item.id);
                    setIsFocus(false);
                }}
            />
        </View>
    );
};

export default TaskDropdown;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderWidth: 0.2,
        paddingHorizontal: 8,
        width: 'auto',
        minWidth: 200,
        textAlign: 'center',
        position: 'relative',
        borderRadius: 100
    },
    label: {

        backgroundColor: 'white',
        right: 0,
        top: 18,

        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: 'black',
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemTextStyle: {
        color: 'black'
    },
    iconStyle: {

    }
});