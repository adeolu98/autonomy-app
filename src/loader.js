import './tailwind.css';

import Loader from "react-loader-spinner";
const LoaderComp = () => {

    return (
        <div>
            <div className="flex justify-center">
                <Loader
                    type="TailSpin"
                    color="rgb(18, 25, 164)"
                    height={70}
                    width={70}
                    timeout={500000000000}
                />
            </div>
            <div className = "flex justify-center">
                <div className = "text-white mt-9">
                    sending request..
                </div>
            </div>
        </div>


    );
}
export default LoaderComp;