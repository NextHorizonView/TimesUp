import { Model } from "@nozbe/watermelondb";
import { text, date } from '@nozbe/watermelondb/decorators'

export default class Schedule extends Model {
    static table = 'schedule'
    @text('name') name;
    @text('description') description;
    @date('date') date;
    @date('start_time') startTime;
    @date('end_time') endTime;
}
