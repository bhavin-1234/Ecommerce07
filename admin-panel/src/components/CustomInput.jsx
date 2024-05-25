import propTypes from "prop-types";

const CustomInput = (props) => {
    const { type, label, i_id, i_class } = props;
    return (
        <>
            <div className="form-floating mb-3">
                <input type={type} className={`form-control ${!i_class ? "" : i_class}`} id={i_id} placeholder={label} />
                <label htmlFor={i_id}>{label}</label>
            </div>
        </>
    )
};

CustomInput.propTypes = {
    type: propTypes.string,
    label: propTypes.string,
    i_id: propTypes.string,
    i_class: propTypes.string,
}


export default CustomInput;
