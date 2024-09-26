import { Card, CardHeader, Avatar } from "@nextui-org/react";
import { getAllCaregories } from "@/app/functions/functions";
import { useQuery } from "@tanstack/react-query";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import Link from "next/link";

function CategoriesSlider() {
    const { data: categories, isLoading: loading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCaregories,
    });

    const settings = {
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500
    };

    if (error) return <p>Error to fetch categories</p>;

    return (
        <Slider {...settings} className="px-2">
            {loading
                ? Array(2)
                    .fill("")
                    .map((_, index) => (
                        <Card
                            key={index}
                            className="justify-center h-32 px-1 border shadow-none">
                            <CardHeader className="justify-between">
                                <div className="justify-center w-full gap-5">
                                    <div className="mx-auto bg-gray-300 rounded-full w-14 h-14 animate-pulse"></div>
                                    <div className="items-start justify-center my-4 text-center">
                                        <h4 className="text-small max-w-[140px] mx-auto rounded-md h-2 font-semibold leading-none text-default-600 bg-gray-300 animate-pulse"></h4>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))
                : categories &&
                categories.map((category: any) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        prefetch={false}
                        className="px-1"
                    >
                        <Card className="justify-center h-32 border shadow-none">
                            <CardHeader className="justify-between">
                                <div className="justify-center w-full gap-5">
                                    <Avatar
                                        isBordered
                                        className="mx-auto"
                                        radius="full"
                                        size="lg"
                                        src={category.img_url}
                                    />
                                    <div className="items-start justify-center mt-5 text-center">
                                        <h4 className="text-xs font-semibold leading-none text-default-600">
                                            {category.name}
                                        </h4>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
        </Slider>
    );
}

export default CategoriesSlider;
