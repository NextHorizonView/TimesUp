import { View, FlatList } from 'react-native'
import React from 'react'

import { withObservables } from '@nozbe/watermelondb/react'
import database from '../watermellon.config'
import { Q } from '@nozbe/watermelondb'
import { switchMap } from '@nozbe/watermelondb/utils/rx'
import CalendarTaskCard from './CalendarTaskCard';

const CalendarTaskContainer = ({ categories, date }) => {
    return (
        <View className='flex-1 px-4 pt-2 mb-16'>
            <FlatList
                contentContainerStyle={{ paddingTop: 10 }}
                showsVerticalScrollIndicator={false}
                data={categories}
                renderItem={({ item, index }) => (
                    <CalendarTaskCard
                        category={item}
                        date={date}
                        isLast={index == categories.length - 1}
                    />
                )}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}

const getStartOfDayLocal = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0); // set to the start of the day in local time
    return date.getTime();
};

const getEndOfDayLocal = (dateString) => {
    const date = new Date(dateString);
    date.setHours(23, 59, 59, 999); // set to the end of the day in local time
    return date.getTime();
};

const enhance = withObservables(["date"], ({ date }) => {
    const startOfDay = getStartOfDayLocal(date);
    const endOfDay = getEndOfDayLocal(date);
    return {
        categories: database.collections.get('categories').query(
            Q.on('tasks', Q.and(
                Q.where('start_date', Q.gte(startOfDay)),
                Q.where('start_date', Q.lte(endOfDay))
            ))
        ).observeWithColumns(['category_id', 'category_name'])
    };
});

const EnhancedCalendar = enhance(CalendarTaskContainer);

export default EnhancedCalendar;
