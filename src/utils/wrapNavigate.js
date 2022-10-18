import { useNavigate } from 'react-router-dom';

const wrapNavigate = (Component) => {
    return (props) => {
        const navigation = useNavigate();
        return <Component navigation={navigation} {...props} />
    }
}

export default wrapNavigate;