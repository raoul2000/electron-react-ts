
import PQueue from 'p-queue';

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

export const submitTask = (): Promise<any> => getQueue().add(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
});

