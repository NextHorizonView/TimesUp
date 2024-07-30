import { Model } from "@nozbe/watermelondb";
import { text, date } from '@nozbe/watermelondb/decorators'

export default class Event extends Model {
    static table = 'events'
    @text('name') name;
    @text('description') description;
    @date('date') date;
}
