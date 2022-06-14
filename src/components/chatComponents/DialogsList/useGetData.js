import useLoadDialogs from './useLoadDialogs';
import { useSelector } from 'react-redux';

const useGetData = (searchParams) => {
    const status = useSelector(state => state.chatReducer.status);
    const dialogs = useLoadDialogs();

    const inputFilter = dialog => {
        return (
            dialog.userName.toLowerCase().includes(searchParams.toLowerCase()) ||
            dialog.messages.find(message =>
                message.content.toLowerCase().includes(searchParams.toLowerCase())
            )
        );
    };

    const statusFilter = dialog => {
        if (status === 'saved') {
            return dialog.saved;
        } else {
            return dialog.status === status;
        }
    };

    if (dialogs) {
        return dialogs
            .filter(dialog => inputFilter(dialog) && statusFilter(dialog))
    } else {
        return null;
    }
};

export default useGetData;