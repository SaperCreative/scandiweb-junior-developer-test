import React from "react";
import styles from './miniCart.module.scss';
import plus from '../../resources/images/plus.svg';
import minus from '../../resources/images/minus.svg';
import { connect } from "react-redux";
import { client } from "../../index";
import { GET_CURRENCY } from "../../utils/queries";
import { setAmmount, setAttribute, removeItem } from "../../redux/cart";
import wrapNavigate from "../../utils/wrapNavigate";

class MiniCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCurrencies: [{}],
        };
    }

    componentDidMount(){
        client
			.query({
				query: GET_CURRENCY
			})
			.then((result) => {
				this.setState({
                    allCurrencies: result.data.currencies,
                });
			});
    }

    handleSetItemAmmount(id,index,input){
        const value = this.props.cart[index].ammount + input
        if(this.props.cart[index].ammount === 1 && input < 0){   
            this.props.removeItem(id)
        }else{
            this.props.setAmmount([id,value])
        }
    }

    handleSetItemAttribute(arr,id,index,input){
        arr[id].indexItem = index
        arr[id].value = input
        this.props.setAttribute(id,arr)
    }

    handleToCart = () => {
        this.props.navigation(`/cart`);
    }

    render() {
        let totalCost = 0
        return (
            <div className={styles.cartBox}>
                <span className={styles.cartTitle}>
                    <b>My bag</b>, {this.props.cart.length} items
                </span>
                {this.props.cart.length>0 && this.props.cart.map((z,indexZ)=>{
                    totalCost = totalCost + 
                    Number(z.price[this.props.activeCurrency].amount * 
                    this.props.cart[indexZ].ammount)
                    return(
                        <div className={styles.itemBox} key={`miniCart-${indexZ}`}>
                            <div className={styles.boxInfo}>
                                <span>{z.company}</span>
                                <span>{z.name}</span>
                                <div className={styles.boxPrice}>
                                    {z.price[this.props.activeCurrency].currency.symbol}
                                    {parseFloat(z.price[this.props.activeCurrency].amount *
                                     this.props.cart[indexZ].ammount).toFixed(2)}
                                </div>
                                {z.attributes.map((x,indexX)=>{
                                    return(
                                        <div className={styles.attrName} key={`attrName-${indexX}`}>
                                            <span>{x.name}:</span>
                                            <div className={styles.rowAttr}>
                                                {x.items.map((y,indexY)=>{
                                                    if(x.name === 'Color') return(
                                                        <div 
                                                            className={`
                                                                ${styles.attrColor} 
                                                                ${z.attributesSelected[indexX].indexItem === indexY&&
                                                                  styles.attrColorSelected}
                                                            `}
                                                            key={`attrSel-${indexY}-${indexX}`}
                                                            style={{backgroundColor: `${y.value}`}}
                                                            onClick={
                                                                () => this.handleSetItemAttribute(z.attributesSelected,indexX,indexY,y.value)
                                                            }
                                                        />
                                                    )
                                                    return(
                                                        <span 
                                                            key={`attrSel-${indexY}-${indexX}`}
                                                            className={`
                                                                ${z.attributesSelected[indexX].indexItem === indexY&&styles.attrTextSelected}
                                                            `}
                                                            onClick={
                                                                () => this.handleSetItemAttribute(z.attributesSelected,indexX,indexY,y.value)
                                                            }
                                                        >
                                                            {y.value}
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.boxAmmount}>
                                <div 
                                    className={styles.ammBtn}
                                    onClick={() => this.handleSetItemAmmount(z.id,indexZ,1)}
                                >
                                    <img src={plus} alt='+'/>
                                </div>
                                <span>
                                    {this.props.cart[indexZ].ammount}
                                </span>
                                <div 
                                    className={styles.ammBtn}
                                    onClick={() => this.handleSetItemAmmount(z.id,indexZ,-1)}
                                >
                                    <img src={minus} alt='-'/>
                                </div>
                            </div>
                            <div className={styles.imgProd}>
                                <img src={z.img[0]} alt='product'/>
                            </div>
                        </div>
                    )
                })}
                <div className={styles.priceSpace}>
                    <span>Total</span>
                    <span>
                        {this.state.allCurrencies.length>1 && 
                        this.state.allCurrencies[this.props.activeCurrency].symbol}
                        {parseFloat(totalCost+(totalCost*0.21)).toFixed(2)}
                    </span>
                </div>
                <div className={styles.spaceBtn}>
                    <div onClick={() => this.handleToCart()}>
                        View bag
                    </div>
                    <div>
                        CHECK OUT
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        cart: state.cart,
        activeCurrency: state.activeStuff.currency
    }
};

const mapDispatchToProps = dispatch => { 
    return{
        setAmmount: (arr) => dispatch(setAmmount(arr)),
        setAttribute: (arr) => dispatch(setAttribute(arr)),
        removeItem : (id) => dispatch(removeItem(id))
    }
};

export default wrapNavigate(connect(
    mapStateToProps,
    mapDispatchToProps
    )(MiniCart));