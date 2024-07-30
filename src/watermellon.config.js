import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './models/schema'
import migrations from './models/migrations'
import { Database } from '@nozbe/watermelondb'
import Task from './models/Task'
import Profile from './models/Profile'
import Schedule from './models/schedule'
import Event from './models/Events'

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
    modelClasses: [Event, Task, Profile, Schedule],
    actionsEnabled: true,
})

export default database;
