export class Task {
    public taskText: string;
    public isComplete: boolean;

    constructor(taskText: string, isComplete: boolean) {
        this.taskText = taskText;
        this.isComplete = isComplete;
    }
}