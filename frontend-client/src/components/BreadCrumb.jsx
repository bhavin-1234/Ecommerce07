import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
    const { title } = props;
    return (
        <div className="bradcrumb py-4">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <p className="text-center mb-0"><Link to="/" className="text-dark">Home &nbsp;</Link>/ {title}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

BreadCrumb.propTypes = {
    title: PropTypes.string,
};

export default BreadCrumb;
