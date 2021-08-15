import Header from '../../Components/Header';
import './style.scss';
import Form from './Form';

function CreateChat() {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className={'create'}>
            <Header page={'Créer un salon'} />
            <Form onSubmit={onSubmit} />
        </div>
    );
}

export default CreateChat;
