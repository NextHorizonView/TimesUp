import { Model } from "@nozbe/watermelondb";
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Profile extends Model {
    static table = 'profiles';
    @text('username') username;
    @field('img_uri') imageUri;
    @field('profession') profession;
    @field('is_beginner') isBeginner;
}