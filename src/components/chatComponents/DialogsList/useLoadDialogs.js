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
            setDialogs(snapshot.val());
            dispatch(getDataSuccess(snapshot.val()));
        });
    };

    useEffect(() => {
        getDialogs();
    }, []);
}

export default useLoadDialogs;