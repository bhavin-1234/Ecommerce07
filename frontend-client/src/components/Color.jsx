import propTypes from "prop-types";


const Color = (props) => {
    const { colorData, setCartFormData } = props;

    return (
        <>
            <ul className="colors ps-0">
                {colorData?.map((color, index) => <li
                    key={index}
                    style={{ backgroundColor: color?.title }}
                    onClick={() => setCartFormData((prev) => ({ ...prev, color: color?._id }))}
                >
                </li>
                )}
            </ul>
        </>
    )
};


Color.propTypes = {
    colorData: propTypes.arrayOf(
        propTypes.shape({
            _id: propTypes.string.isRequired,
            title: propTypes.string.isRequired
        })
    ),
    setCartFormData: propTypes.func,
    // color: propTypes.string
}



export default Color;
