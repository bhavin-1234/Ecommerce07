import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";

const PrivacyPolicy = () => {
    return (
        <>
            <Meta title="Privacy policy" />
            <BreadCrumb title="Privacy policy" />
            <div className="policy-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="policy"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy;
