import propTypes from 'prop-types';
import { Helmet } from "react-helmet";

const Meta = ({title}) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
            </Helmet>
        </>
    )
}

Meta.propTypes = {
    title: propTypes.string
}

export default Meta;
