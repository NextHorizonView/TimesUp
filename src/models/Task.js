import { Model } from "@nozbe/watermelondb";
import { text, date, field } from '@nozbe/watermelondb/decorators'

export default class Task extends Model {
    static table = 'tasks'
    @text('name') name;
    @text('description') description;
    @date('due_date') dueDate;
    @field('priority') priority;
}
