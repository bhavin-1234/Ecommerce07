import propTypes from "prop-types";

const Container = (props) => {
    return (
        <section className={props.class1}>
            <div className="container-xxl">
                {props.children}
            </div>
        </section>
    )
}

Container.propTypes = {
    children: propTypes.node,
    class1: propTypes.string,
}



export default Container;
