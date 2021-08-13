import Header from '../Header';
import './style.scss';
import Form from './Form';

function CreateChat() {
    return (
        <div className={'create'}>
            <Header page={'Créer un salon'} />
            <Form />
        </div>
    );
}

export default CreateChat;
