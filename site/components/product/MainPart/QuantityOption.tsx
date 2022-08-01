const QuantityOption = (props: any) => {
    const { qty } = props;
    let content = [];
    for (let i = 1; i <= qty; i++) {
        if (i === 1) {
            content.push(<option selected value="1">1</option>);
        }
        else {
            content.push(<option value={i}>{i}</option>);
        }
      }
    return (
        <select className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:w-full">
            {content}
        </select>
    )
};

export default QuantityOption;