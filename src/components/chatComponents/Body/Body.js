import { useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';

const dialogs = [
    {
        dialogId: 0,
        userName: "Some Name",
        messages: [
            {
                content: "Hi! Today i was trying to...",
                timestamp: 123124123123132,
                writtenBy: "client"
            },
            {
                content: "Hello! Wait a moment, we will help you soon",
                timestamp: 123124123123432,
                writtenBy: "operator"
            }
        ],
        operatorId: 0,
        status: "active"
    },
    {
        dialogId: 1,
        userName: "Berg Evgeny",
        messages: [
            {
                content: "Client message",
                timestamp: 123124123123132,
                writtenBy: "client"
            },
            {
                content: "Operator message",
                timestamp: 123124123123432,
                writtenBy: "operator"
            }
        ],
        operatorId: 0,
        status: "active"
    }
]

const findChats = (dialog, searchParams) => {
    if(dialog.userName.toLowerCase().includes(searchParams.toLowerCase())) {
        return true;
    }
    return dialog.messages.find(message => message.content.toLowerCase().includes(searchParams.toLowerCase()));
}

function Body() {
    const [ searchParams, setSearchParams ] = useState('');
    const results = dialogs.filter(dialog => findChats(dialog, searchParams)).map(dialog => <p key={dialog.dialogId}>{dialog.userName}</p>);

    return (
        <div>
            <SearchBar value={searchParams} setValue={setSearchParams} />
            <div>{results}</div>
        </div>
    );
}

export default Body;