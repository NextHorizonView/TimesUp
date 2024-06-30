import { withObservables } from '@nozbe/watermelondb/react'
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import database from '../watermellon.config';

const TaskDropdown = ({ setCategoryName, isLight, tasks, categoryName }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState('');
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const temp = []
        tasks.map((category, id) => {
            temp.push({ label: category.name, value: id })
            if (categoryName && category.name == categoryName) {
                setValue(id)
                setCategoryName(categoryName)
            }
        })
        if (temp.length > 0) {
            setCategories(temp);
            if (!categoryName) {
                setCategoryName(temp[0].label);
                setValue(temp[0]);
            }
        }
    }, [tasks])
    useEffect(() => {
        if (tasks) {
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].name == categoryName) {
                    setValue(i);
                    setCategoryName(categoryName);
                }
            }
        }
    }, [categoryName])
    return (
        <View>
            <Dropdown
                style={[styles.dropdown, isLight && { borderColor: 'white' }]}
                placeholderStyle={[styles.placeholderStyle, isLight && { color: 'white' }]}
                selectedTextStyle={[styles.selectedTextStyle, isLight && { color: 'white' }]}
                itemTextStyle={styles.itemTextStyle}
                data={categories}
                maxHeight={300}
                labelField="label"
                valueField="value"
                iconStyle={styles.iconStyle}
                placeholder={!isFocus ? 'Select item' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCategoryName(item.label);
                    setIsFocus(false);
                    setValue(item);
                }}
            />
        </View>
    );
};

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

const enhance = withObservables([], () => ({
    tasks: database.get('categories').query().observeWithColumns(['name', 'description', 'priority']),
}));

const EnhancedTaskList = enhance(TaskDropdown);

export default EnhancedTaskList;