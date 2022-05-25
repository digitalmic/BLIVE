import firebase from 'firebase';

class Fire {

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    get createdAt() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    parse = snapshot => {
        const { createdAt: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const createdAt = new Date(numberStamp);
        const message = {
            _id,
            createdAt,
            text,
            user,
        };
        return message;
    };

    on = callback => {
        this.ref
            .limitToLast(50)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    };
    
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                createdAt: this.createdAt,
            };
            this.append(message);
        }
    };

    // send the message to the Backend
    append = message => this.ref.push(message);

    delete = keyId => this.ref.child(keyId).remove();

    // close the connection to the Backend
    off() {
        this.ref.off();
    }
}

Fire.shared = new Fire();
export default Fire;