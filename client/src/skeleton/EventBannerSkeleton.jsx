import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "lottie-react";
import ImagePlaceHolder from "../assets/images/image.json";

const EventBannerSkeleton = () => {
    return (
        <div className="container-fluid hero-bg py-5">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    {/* Text Skeleton */}
                    <div className="col-md-6 p-4">
                        <Skeleton height={40} width="80%" className="mb-3" />
                        <Skeleton count={3} />
                        <Skeleton height={36} width="40%" className="mt-4" />
                    </div>

                    {/* Image Placeholder */}
                    <div className="col-md-6 text-center">
                        <Lottie className="w-75" animationData={ImagePlaceHolder} loop={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventBannerSkeleton;
