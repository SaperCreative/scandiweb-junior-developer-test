import React from "react";
import styles from './itemBox.module.scss'
import cart from '../../resources/images/cart.svg';
import favourite from '../../resources/images/favourite.svg';
//import correct from '../../resources/images/correct.svg';
import { GET_PRODUCTS_LIST } from "../../utils/queries";
import { Query } from "@apollo/client/react/components";
import wrapNavigate from '../../utils/wrapNavigate'
import { connect } from "react-redux";
import { addItem } from "../../redux/cart";
import { client } from "../../index";
import { GET_CATEGORY_NAMES } from "../../utils/queries";
  
class ItemBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCategories: [{}]
        };
    }

    componentDidMount(){
        client
			.query({
				query: GET_CATEGORY_NAMES
			})
			.then((result) => {
				this.setState({
                    allCategories: result.data.categories
                });
			});
    }

    handleToProduct = (id) => {
        this.props.navigation(`/product/${id}`);
    }

    handleAddToCart = (item) =>{
        let array = []
        item.attributes.forEach((element,index) => {
            array.push(
                {
                    id:index,
                    value:element.items[0].value,
                    selected:true,
                    indexItem:0
                }
            )
        });
        this.props.addCart([
            item.attributes,
            array,
            item.name,
            item.brand,
            item.prices,
            item.gallery,
        ])
    }

    render() {
        if(this.state.allCategories.length > 1)return(
            <Query
                key={"yes"}
                query={GET_PRODUCTS_LIST}
                variables={{ type:  {title: this.state.allCategories[this.props.activeCategory].name} }}
                fetchPolicy="network-only"
            >
                {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error}</p>;
                if (data.category === undefined) return null;
                
                const products = data.category.products;

                return products.map((item, index) => (
                    <div className={styles.box} key={`item-${index}`}>
                        {!item.inStock && 
                            <div className={styles.disabled}/>
                        }
                        <div 
                            className={styles.productImg} 
                            onClick={() => this.handleToProduct(item.id)}
                        >
                            <img src={item.gallery[0]} alt='product'/>
                            {/*
                            I found in figma an reference to discount element so i made one :D
                            <div className={styles.disc}>
                                <img src={correct} alt='fav'/>
                                {discount}
                            </div>
                            */}
                            <div className={styles.fav}>
                                <img src={favourite} alt='fav'/>
                            </div>
                        </div>
                        <div className={styles.desc}>
                            <span>{item.brand} {item.name}</span>
                            <span>
                                {`${item.prices[this.props.activeCurrency].currency.symbol}
                                  ${item.prices[this.props.activeCurrency].amount}`}
                            </span>
                            {item.inStock && 
                                <div 
                                    className={styles.btnCart}
                                    onClick={() => this.handleAddToCart(item)}
                                >
                                    <img  src={cart} alt='cart'/>
                                </div>
                            }
                        </div>
                    </div>                     
                ));
                }}
            </Query>
        );
    }
}

const mapStateToProps = state => {
    return{
        activeCurrency: state.activeStuff.currency,
        activeCategory: state.activeStuff.category,
        cart: state.cart,
    }
};

const mapDispatchToProps = dispatch => { 
    return{
        addCart: (arr) => dispatch(addItem(arr))
    }
};

export default wrapNavigate(
    connect(
    mapStateToProps,
    mapDispatchToProps
    )(ItemBox));