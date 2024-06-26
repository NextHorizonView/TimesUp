import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'categories',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'priority', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'tasks',
            columns: [
                { name: 'body', type: 'string' },
                { name: 'start_date', type: 'number' },
                { name: 'due_date', type: 'number' },
                { name: 'is_completed', type: 'boolean' },
                { name: 'category_id', type: 'string' },
            ]
        }),
    ]
})
