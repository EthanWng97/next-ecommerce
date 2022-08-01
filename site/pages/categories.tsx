import Layout from "@components/common/Layout";
import client from '@components/apollo/client';
import ParentCategoriesBlock from "@components/category/category-block/ParentCategoriesBlock";
import GET_CATEGORIES_QUERY from "@woocommerce/categories/graphql/get-categories";

export default function Categories ( props ) {

	const { productCategories } = props;

	return (
		<Layout>
			{/*Categories*/}
			<div className="categories product-categories-container container mx-auto my-32 px-4 xl:px-0">
				<h2 className="text-2xl mb-5 uppercase">Categories</h2>
				<ParentCategoriesBlock productCategories={ productCategories }/>
			</div>
		</Layout>
	)
};

export async function getStaticProps() {

	const {data} = await client.query({
		query: GET_CATEGORIES_QUERY,
	});

	return {
		props: {
			productCategories: data?.productCategories?.nodes || []
		},
		revalidate: 1
	}

};
