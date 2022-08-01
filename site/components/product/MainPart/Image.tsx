import {
    Tab,
} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Image = (props: any) => {
    const { product } = props;
    const { targetDatabaseId } = props;

    return (
        <Tab.Group
        as="div"
        className="flex flex-col-reverse"
        style={{ text: "center", position: "sticky", top: 0 }}
        >
        {/* Image selector */}
        {/* mini image */}
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
                {product.databaseId === targetDatabaseId ? (
                <Tab
                key={product.id}
                className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                {({ selected }) => (
                    <>
                    <span className="sr-only">{product.name}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img
                        src={product.image.sourceUrl}
                        alt=""
                        className="w-full h-full object-center object-cover"
                        />
                    </span>
                    <span
                        className={classNames(
                        selected ? "ring-indigo-500" : "ring-transparent",
                        "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                        )}
                        aria-hidden="true"
                    />
                    </>
                )}
                </Tab>
                ) : (
                product.variations.nodes.map((node: any) => (
                node.databaseId === targetDatabaseId ? (
                <Tab
                key={node.id}
                className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                {({ selected }) => (
                    <>
                    <span className="sr-only">{node.name}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img
                        src={node.image.sourceUrl}
                        alt=""
                        className="w-full h-full object-center object-cover"
                        />
                    </span>
                    <span
                        className={classNames(
                        selected ? "ring-indigo-500" : "ring-transparent",
                        "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                        )}
                        aria-hidden="true"
                    />
                    </>
                )}
                </Tab> ) : ""
            ))
                )}
            
            </Tab.List>
        </div>

        {/* Big Image */}
        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
        { product.databaseId === targetDatabaseId ? (
            <Tab.Panel key={product.id}>
            <img
            src={product.image.sourceUrl}
            className="w-full h-full object-center object-cover sm:rounded-lg"
            />
            </Tab.Panel>
        ) :
        (
            product.variations.nodes.map((node: any) => (
                node.databaseId === targetDatabaseId ? (
                // isCorrectProduct(node.attributes.nodes, selectedAllFlavor) ? (
                <Tab.Panel key={node.id}>
                <img
                src={node.image.sourceUrl}
                className="w-full h-full object-center object-cover sm:rounded-lg"
                />
                </Tab.Panel> ) : ""
            ))
        )
        }
        </Tab.Panels>
    </Tab.Group>
    )
}

export default Image;