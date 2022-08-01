import { useEffect, useState } from "react";
import {
    RadioGroup,
} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Variant = (props: any) => {
    const { variations_nodes } = props;
    const { title_label } = props;
    const { variation_label } = props;
    const { selectedAllFlavor } = props;
    const { setSelectedAllFlavor } = props;
    const { index } = props;
    const { availableProducts } = props;
    let options = new Array<string>();

    // store selected option of current flavor
    const [selectedFlavor, setSelectedFlavor] = useState("");

    // update all selected flavor
    useEffect(() => {
      let oldAllFlavor = [...selectedAllFlavor];
      oldAllFlavor[index] = selectedFlavor;
      setSelectedAllFlavor(oldAllFlavor);
    }, [selectedFlavor])

    // store all options of current variation_label
    variations_nodes.map((node: any) => {
      node.attributes.nodes.map((option: any) => {
        if(option.label === variation_label && options.indexOf(option.value) === -1) {
          options.push(option.value)
        }
      })
    })

    // For product in availableProducts, store all options of current variation_label
    let availableOptions = [];
    variations_nodes.map((node: any) => {
      if(availableProducts.includes(node.databaseId)) {
        availableOptions.push(node.attributes.nodes[index].value)
      }
    })

    return (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">{title_label}</h2>
            <div
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <button type="button" onClick={() => setSelectedFlavor("")}>Clear</button>
            </div>
          </div>

          <RadioGroup
            value={selectedFlavor}
            onChange={setSelectedFlavor}
            className="mt-2"
          >
            <RadioGroup.Label className="sr-only">
              Choose a flavor
            </RadioGroup.Label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {options.map((option: any) => (
                <RadioGroup.Option
                //   key={node.databaseId}
                  value={option}
                  // value={isValidProduct(variations_nodes, selectedAllFlavor, option, index)}
                  className={({ active, checked }) =>
                    classNames(
                      // node.stockQuantity
                      // !isValidProduct(variations_nodes, selectedAllFlavor, option, index)
                      availableOptions.includes(option)
                        ? "cursor-pointer focus:outline-none"
                        : "opacity-25 cursor-not-allowed",
                      active
                        ? "ring-2 ring-offset-2 ring-indigo-500"
                        : "",
                      checked
                        ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                      "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1 variable-items-wrapper button-variable-wrapper whitespace-nowrap inline-block col-span-2"
                    )
                  }
                  disabled={!availableOptions.includes(option)}
                >
                  <RadioGroup.Label as="span">
                    {option}
                  </RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
    )
}

export default Variant;