import propTypes from "prop-types";

const CustomInput = (props) => {
    const { type, label, i_id, i_class, name, val, onCh, onBl } = props;
    return (
        <>
            <div className="form-floating mt-3">
                <input
                    type={type}
                    name={name}
                    value={val}
                    className={`form-control ${!i_class ? "" : i_class}`}
                    id={i_id}
                    placeholder={label}
                    onChange={onCh}
                    onBlur={onBl}
                />
                <label htmlFor={i_id}>
                    {label}
                </label>
            </div>
        </>
    )
};

CustomInput.propTypes = {
    type: propTypes.string,
    label: propTypes.string,
    i_id: propTypes.string,
    i_class: propTypes.string,
    name: propTypes.string,
    val: propTypes.string,
    onCh: propTypes.func,
    onBl: propTypes.func,
}


export default CustomInput;
