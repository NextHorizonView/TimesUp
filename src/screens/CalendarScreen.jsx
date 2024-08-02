import { View } from 'react-native'
import React, { useState, useRef, useMemo } from 'react'

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import database from '../watermellon.config'
import EventForm from '../components/EventForm'
import { withObservables } from '@nozbe/watermelondb/react'
import CalendarEvents from '../components/CalendarEvents';


const CalendarScreen = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [event, setEvent] = useState(null);

    const bottomSheetRef = useRef(null);
    const snapShot = useMemo(() => ['80%'], []);

    return (
        <View className='flex-1 bg-black'>
            <CalendarEvents setEvent={setEvent} bottomSheetRef={bottomSheetRef} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapShot}
                // onChange={(index) => console.log('snapped to', index)}
                enablePanDownToClose={true}
                backdropComponent={renderBackdrop}
            >
                <View className='flex-1 bg-white'>
                    <EventForm event={event} selectedDate={selectedDate} bottomSheetRef={bottomSheetRef} />
                </View>
            </BottomSheet>
        </View>
    )
}


const renderBackdrop = (backdropProps) => (
    <BottomSheetBackdrop
        {...backdropProps}
        enableTouchThrough={false} // Ensure touch through is disabled for backdrop interaction
        disappearsOnIndex={-1}
        appearsOnIndex={0}
    />
);

export default CalendarScreen;