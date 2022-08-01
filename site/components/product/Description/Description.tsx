const Description = (props: any) => {
    const { description } = props;
    // console.log(product)
    
    return (
        <div className="max-w-2xl mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
            { description ? 
            (<div dangerouslySetInnerHTML={{ __html: description }}>
            </div>)
            : ""}
        </div>
    );
}
export default Description;