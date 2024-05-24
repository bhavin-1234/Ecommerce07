import propTypes from 'prop-types';
import { Helmet } from "react-helmet";

const Meta = (props) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
            </Helmet>
        </>
    )
}

Meta.propTypes = {
    title: propTypes.string.isRequired
}

export default Meta;
