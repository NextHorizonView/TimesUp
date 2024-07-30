import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'profile',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'img_uri', type: 'string' },
                { name: 'profession', type: 'string' },
                { name: 'phone_number', type: 'number' },
                { name: 'dob', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'tasks',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'due_date', type: 'number' },
                { name: 'priority', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'events',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'date', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'schedule',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'date', type: 'number' },
                { name: 'start_time', type: 'number' },
                { name: 'end_time', type: 'number' },
            ]
        }),
    ]
})
