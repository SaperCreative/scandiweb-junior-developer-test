import React from "react";
import styles from './cart.module.scss';
import arrow from '../../resources/images/arrow.svg';
import plus from '../../resources/images/plus.svg';
import minus from '../../resources/images/minus.svg';
import Nav from "../../components/nav/nav";
import { connect } from "react-redux";
import { setAmmount, setAttribute, removeItem } from "../../redux/cart";
import { client } from "../../index";
import { GET_CURRENCY } from "../../utils/queries";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCurrencies: [{}],
            imgsIndex: [],
            ammountItems:0
        };
    }

    componentDidMount(){
        this.handleCreateIndexImg()
        this.handleCreateAmmountItems()
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

    handleSetItemAmmount(id,input){
        const value = this.props.cart[id].ammount + input
        if(this.props.cart[id].ammount === 1 && input < 0){   
            this.props.removeItem(id)
        }else{
            this.props.setAmmount([id,value])
        }
        this.handleSetAmmountItems(input)
    }

    handleSetItemAttribute(arr,id,index,input){
        arr[id].indexItem = index
        arr[id].value = input
        this.props.setAttribute(id,arr)
    }

    handleCreateIndexImg(){
        let array = []
        this.props.cart.forEach(index => {
            array.push(0)
        });
        this.setState({
            imgsIndex: array,
        });
    }

    handleCreateAmmountItems(){
        let ammount = 0
        this.props.cart.forEach(item => {
            ammount+=item.ammount
        });
        this.setState({
            ammountItems: ammount,
        });
    }

    handleSetAmmountItems(input){
        this.setState({
            ammountItems: this.state.ammountItems+input,
        });
    }

    handleSetIndexImg = (id,input) =>{
        const array = this.state.imgsIndex
        console.log()
        const imgLength = this.props.cart[id].img.length
        if(input>0){
            array[id]===imgLength-1 ?
            array.splice(id,1,array[id]+input) :
            array.splice(id,1,0)
        }else{
            array[id]===0 ? 
            array.splice(id,1,imgLength-1) :
            array.splice(id,1,array[id]+input)
        }
        this.setState({
            imgsIndex: array,
        });
    }

    render() {
        let totalCost = 0
        return (
            <div className={styles.container}>
                <Nav/>
                <div className={styles.title}>
                    Cart
                </div>
                {this.props.cart.length>0 && this.props.cart.map((itemZ,indexZ)=>{
                totalCost = totalCost + 
                Number(itemZ.price[this.props.activeCurrency].amount *
                this.props.cart[indexZ].ammount)
                    return(
                        <div className={styles.content}>
                            <div className={styles.itemAbout}>
                                <div className={styles.aboutName}>
                                    <span>{itemZ.company}</span>
                                    <span>{itemZ.name}</span>
                                </div>
                                <div className={styles.aboutPrice}>
                                    {itemZ.price[this.props.activeCurrency].currency.symbol}
                                    {parseFloat(itemZ.price[this.props.activeCurrency].amount * 
                                     this.props.cart[indexZ].ammount).toFixed(2)}
                                </div>
                                {itemZ.attributes.map((x,indexX)=>{
                                    return(
                                        <div className={styles.aboutAttribute}>
                                            <span>{x.name}:</span>
                                            <div className={styles.rowAttr}>
                                                {x.items.map((y,indexY)=>{
                                                    if(x.name === 'Color') 
                                                        return(
                                                            <div 
                                                                className={`
                                                                    ${styles.attrColor} 
                                                                    ${itemZ.attributesSelected[indexX].indexItem === indexY&&
                                                                      styles.attrColorSelected}
                                                                `}
                                                                key={`attrSel-${indexY}-${indexX}`}
                                                                style={{backgroundColor: `${y.value}`}}
                                                                onClick={
                                                                    () => this.handleSetItemAttribute(itemZ.attributesSelected,indexX,indexY,y.value)
                                                                }
                                                            />
                                                        )
                                                    return(
                                                        <span 
                                                            key={`attrSel-${indexY}-${indexX}`}
                                                            className={`
                                                                ${itemZ.attributesSelected[indexX].indexItem === indexY&&
                                                                  styles.attrTextSelected}
                                                            `}
                                                            onClick={
                                                                () => this.handleSetItemAttribute(itemZ.attributesSelected,indexX,indexY,y.value)
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
                            <div className={styles.itemAmmount}>
                                <div className={styles.ammountActionSpace}>
                                    <div 
                                        className={styles.ammountBtn}
                                        onClick={() => this.handleSetItemAmmount(indexZ,1)}
                                    >
                                        <img src={plus} alt="plus"/>
                                    </div>
                                    <span>
                                        {this.props.cart[indexZ].ammount}
                                    </span>
                                    <div 
                                        className={styles.ammountBtn}
                                        onClick={() => this.handleSetItemAmmount(indexZ,-1)}
                                    >
                                        <img src={minus} alt="minus"/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.itemImages}>
                                <img src={itemZ.img[this.state.imgsIndex[indexZ]]} alt="product"/>
                                <div className={styles.imageBtnsSpace}>
                                    <div 
                                        className={styles.imageBtn}
                                        onClick={() => this.handleSetIndexImg(indexZ,1)}
                                    >
                                        <img src={arrow} alt=""/>
                                    </div>
                                    <div 
                                        className={styles.imageBtn}
                                        onClick={() => this.handleSetIndexImg(indexZ,-1)}
                                    >
                                        <img src={arrow} alt=""/> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                <div className={styles.totalOrder}>
                    <div className={styles.orderSpace}>
                        <span>Tax 21%:</span>
                        <b>
                            {this.state.allCurrencies.length>1 &&
                             this.state.allCurrencies[this.props.activeCurrency].symbol}
                            {parseFloat(totalCost*0.21).toFixed(2)}
                        </b>
                    </div>
                    <div className={styles.orderSpace}>
                        <span>Quantity:</span>
                        <b>{this.state.ammountItems}</b>
                    </div>
                    <div className={styles.orderSpace}>
                        <span className={styles.totalBold}>Total:</span>
                        <b>
                            {this.state.allCurrencies.length>1 &&
                             this.state.allCurrencies[this.props.activeCurrency].symbol}
                            {parseFloat(totalCost+(totalCost*0.21)).toFixed(2)}
                        </b>
                    </div>
                    <div className={styles.orderBtn}>
                        ORDER
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

export default connect(
    mapStateToProps
    ,mapDispatchToProps
    )(Cart);