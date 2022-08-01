import { gql } from "@apollo/client";

export const PRODUCT_BY_SLUG_QUERY = gql` query Product($slug: ID!) {
	product(id: $slug, idType: SLUG) {
		averageRating
		slug
		description
		image {
		  id
		  uri
		  title
		  srcSet
		  sourceUrl
		}
		shortDescription
		reviewCount
		reviews {
		  nodes {
			content
			author {
			  node {
				name
			  }
			}
			date
		  }
		  averageRating
		}
		link
		attributes {
		  nodes {
			label
		  }
		}
		... on VariableProduct {
		  id
		  databaseId
		  name
		  regularPrice
		  salePrice
		  stockQuantity
		  upsell {
			nodes {
			  name
			  slug
			}
		  }
		  variations {
			nodes {
			  name
			  id
			  databaseId
			  regularPrice
			  salePrice
			  stockQuantity
			  attributes {
				nodes {
				  value
				  label
				}
			  }
			  image {
				sourceUrl
			  }
			}
		  }
		}
	}
}
`;

export const PRODUCT_SLUGS = gql` query Products {
  products(first: 5000) {
    nodes {
      id
      slug
    }
  }
}
`;
