import propTypes from "prop-types";

const CustomInput = (props) => {
    const { val, i_id, label, type, name, i_class, onCh, onBl } = props;
    return (
        <>
            <div className="form-floating">
                <input
                    value={val}
                    type={type}
                    name={name}
                    id={i_id}
                    onChange={onCh}
                    onBlur={onBl}
                    placeholder={label}
                    className={`form-control ${!i_class ? "" : i_class}`} />
                <label htmlFor={i_id}>{label}</label>
            </div>
        </>
    )
};

CustomInput.propTypes = {
    val: propTypes.string,
    i_id: propTypes.string,
    i_class: propTypes.string,
    type: propTypes.string,
    name: propTypes.string,
    label: propTypes.string,
    onCh: propTypes.func,
    onBl: propTypes.func,
}

export default CustomInput;

