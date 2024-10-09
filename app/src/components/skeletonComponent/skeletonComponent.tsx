import '../../response.css'

export default function SkeletoComponent() {
    return (
        <div className="p-2 mx-auto">
            <div className="rounded-md bg-gray-200 animate-pulse skeleton_main" />
            <div className="my-2 bg-gray-200 rounded-md animate-pulse skeleton_title" />
            <div className="flex items-center justify-between skeleton_items_row">
                <div className="w-5/12 h-3 my-2 bg-gray-200 rounded-md animate-pulse skeleton_items_price" />
                <div className="w-8 h-8 my-2 bg-gray-200 rounded-full animate-pulse skeleton_items_button" />
            </div>
        </div>
    );
}