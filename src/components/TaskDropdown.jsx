import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TaskDropdown = ({ categories, categoryId, setCategoryId }) => {
    const [value, setValue] = useState(1);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                data={categories}
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={!isFocus ? 'Select item' : '...'}
                value={categoryId}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCategoryId(item.id);
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
        borderColor: 'gray',
        borderWidth: 0,
        paddingHorizontal: 8,
        width: 200,
        borderWidth: 0.5,
        borderRadius: 10
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: 'black'
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold'
    },
    itemTextStyle: {
        color: 'black'
    },
});