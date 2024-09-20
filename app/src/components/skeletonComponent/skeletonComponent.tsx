export default function SkeletoComponent() {
    return (
        <div>
            <div className="w-[250px] h-[300px] rounded-md bg-gray-200 animate-pulse" />
            <div className="w-full h-3 bg-gray-200 animate-pulse rounded-md my-2" />
            <div className="flex items-center justify-between">
                <div className="w-5/12 h-3 bg-gray-200 animate-pulse rounded-md my-2" />
                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full my-2" />
            </div>
        </div>
    );
}