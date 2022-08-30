import { Task } from './task';

export interface Visitor {
    email: string;
    verificationCode: number;
    beforeReminderTime: number;
    tasks: Task[];
}