import { useDispatch } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import { database } from '../../../firebase';
import { getDataSuccess } from './../../../redux/actions/actions';


const useLoadDialogs = () => {
    const dispatch = useDispatch();
    const [dialogs, setDialogs] = useState('');

    const dbRef = ref(database, 'dialogs/');

    const getDialogs = () => {
        onValue(dbRef, snapshot => {
            let array;
            snapshot.forEach(child => {
                let obj = child.val();
                obj.dialogId = child.key;
                if (array) {
                    array.push(obj);
                } else {
                    array = [obj];
                }
            });
            setDialogs(array);
            dispatch(getDataSuccess(array));
        });
    };

    useEffect(() => {
        getDialogs();
    }, []);

    return dialogs;
}

export default useLoadDialogs;