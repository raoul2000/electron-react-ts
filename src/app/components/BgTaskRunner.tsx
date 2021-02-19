import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { bgTaskState } from '../state';
import { submitTask } from '../lib/task-runner';

export const BgTaskRunner: React.FC<{}> = (): JSX.Element => {
    const [bgTask, setBgTask] = useRecoilState(bgTaskState);

    console.log('BgTaskRunner');
    useEffect(() => {
        console.log('useEffect');
        if (bgTask.name) {
            submitTask()
                .then(() => console.log('task done'))
                .then( () => setBgTask({
                    name: '',
                    idle: true
                }));
        }      
    }, [bgTask]);
return (
    <></>
);
}