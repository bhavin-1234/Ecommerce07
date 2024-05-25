import propTypes from "prop-types";

const CustomInput = (props) => {
    const { type, name, placeholder, classname } = props;
    return (
        <>
            <div>
                <input type={type} name={name} placeholder={placeholder} className={`form-control ${!classname ? "" : classname}`} />
            </div>
        </>
    )
};

CustomInput.propTypes = {
    type: propTypes.string,
    name: propTypes.string,
    placeholder: propTypes.string,
    classname: propTypes.string,
}

export default CustomInput;

