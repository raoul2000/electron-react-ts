import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {bgTaskState} from '../state';

export const BgTaskRunner: React.FC<{}> = ():JSX.Element => {
    const [bgTask, setBgTask] = useRecoilState(bgTaskState);

    console.log('BgTaskRunner');
    useEffect(() => {
        console.log('useEffect');
        if(bgTask.name) {
            console.log(`START task ${bgTask.name}`)
            setTimeout(() => {
                console.log(`END task ${bgTask.name}`);
                setBgTask({
                    name: '',
                    idle: true
                });
                
            }, 4000);
        }
    },[bgTask]);
    return ( 
        <></>
    );
}