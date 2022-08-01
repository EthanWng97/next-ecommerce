const ProductPrice = (props: any) => {
    const { product } = props;
    const { targetDatabaseId } = props;

    return (
        product.databaseId === targetDatabaseId ?
            (
              <div className="flex items-center">
                {product.regularPrice}
              </div>
            ) :
            (
              product.variations.nodes.map((node: any) => (
                node.databaseId === targetDatabaseId ?
                (
                  <div className="flex items-center">
                    {node.regularPrice}
                  </div>
                ) : ""
              ))
            )
    )
}
export default ProductPrice