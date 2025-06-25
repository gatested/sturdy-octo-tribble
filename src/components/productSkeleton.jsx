import Skeleton from "react-loading-skeleton";
function ProductSkeleton() {
    return (
        <button className="Product">
            <Skeleton width={100} height={100} />
            <Skeleton width={130} height={20} />
            <Skeleton width={130} height={50} />
        </button>
    )
}

export default ProductSkeleton;