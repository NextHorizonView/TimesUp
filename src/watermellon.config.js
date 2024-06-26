import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './models/schema'
import migrations from './models/migrations'
import { Database } from '@nozbe/watermelondb'
import Category from './models/Category'
import Task from './models/Task'

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    jsi: Platform.OS === 'ios',
    onSetUpError: error => {
        console.log(error);
    }
});

const database = new Database({
    adapter,
    modelClasses: [Category, Task],
    actionsEnabled: true,
})

export default database;
