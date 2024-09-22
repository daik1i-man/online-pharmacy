export default function SkeletoComponent() {
    return (
        <div className="p-2 mx-auto">
            <div className="w-[250px] h-[300px] rounded-md bg-gray-200 animate-pulse" />
            <div className="w-[250px] h-3 my-2 bg-gray-200 rounded-md animate-pulse" />
            <div className="flex items-center justify-between w-[250px]">
                <div className="w-5/12 h-3 my-2 bg-gray-200 rounded-md animate-pulse" />
                <div className="w-8 h-8 my-2 bg-gray-200 rounded-full animate-pulse" />
            </div>
        </div>
    );
}