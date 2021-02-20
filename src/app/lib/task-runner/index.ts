
import PQueue from 'p-queue';


export type Task = {
    id:string;
    payload: any
};

let taskQueue: PQueue;

const getQueue = (): PQueue => {
    initQueue();
    return taskQueue;
}
export const initQueue = () => {
    if (!taskQueue) {
        taskQueue = new PQueue({
            concurrency: 2
        });
    }
};

//const findTaskRunner = (task:Task): Promise<TaskRunner> => 

export const submitTask = (task: Task): Promise<any> => getQueue().add(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
});

