import React from "react";
import styles from './frameProduct.module.scss'
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT_BY_ID } from '../../utils/queries';
import { connect } from "react-redux";
import { addItem } from "../../redux/cart";

class FrameProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgId: 0,
            options: 0,
            optionSelected: []
        };
    }

    handleSetOptions(data){
        data.product.attributes.forEach((element, index )=> {
            this.setState(prevState =>({ 
                optionSelected: [
                    ...prevState.optionSelected, 
                    {id:index,value:-1,selected:false,indexItem:-1}
                ]
            }))
        });
        this.setState({ 
            options: data.product.attributes.length
        })
    }

    handleSetSelected(id,input,index){
        const arr = this.state.optionSelected;
        if(arr[id].selected){
            arr.splice(id,1,{id:id, value:input, selected:false, indexItem:-1});
        }else{
            arr.splice(id,1,{id:id, value:input, selected:true, indexItem:index});
        }
        this.setState({
            optionSelected: arr
        })
    }

    handleAddToCart(item){
        let conunt = 0
        this.state.optionSelected.forEach(element => {
            element.selected && conunt++
        });
        if(conunt >= this.state.options){
            this.props.cart([
                item.attributes,
                this.state.optionSelected,
                item.name,
                item.brand,
                item.prices,
                item.gallery,
            ])
        }
    }

    handleSetImg(id){
        this.setState({
            imgId: id
        })
    }

    render() {
        return(
            <Query
                query={GET_PRODUCT_BY_ID}
                variables={{ id: this.props.id }}
                onCompleted={(data) =>
                    this.handleSetOptions(data)
                }
                fetchPolicy="network-only"
            >
                {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return console.log(error);
                if (data.product === undefined) return null;

                const product = data.product;
                const images = product.gallery;
                const price = product.prices[this.props.activeCurrency];
                const description = product.description.replace(/<\/?[^>]+(>|$)/g, "");
            
                return (
                    <div className={styles.grid}>
                        <div className={styles.imgList}>
                            {images.map((item,index)=>
                                <img 
                                    src={item} 
                                    alt='small product' 
                                    key={`imageProd-${index}`}
                                    onClick={() => this.handleSetImg(index)}
                                />
                            )}
                        </div>
                        <div className={styles.imgProduct}>
                            <img src={images[this.state.imgId]} alt='product'/>
                        </div>
                        <div className={styles.descProduct}>
                            <div className={styles.descTitle}>
                                <span>{product.brand}</span>
                                <span>{product.name}</span>
                            </div>
                            {product.attributes.map((x,indexX)=>{
                                return(
                                    <div className={styles.descAttr} key={`attrId-${indexX}`}>
                                        <span>{x.name}</span>
                                        <div className={styles.attrSelect} >
                                            {x.items.map((y,index)=>{
                                                if(x.name === 'Color') return(
                                                    <div 
                                                        key={`attrSel-${index}-${indexX}`}
                                                        className={`
                                                            ${styles.attrColor} 
                                                            ${this.state.optionSelected[indexX].indexItem === index && styles.colorSelected}
                                                        `} 
                                                        style={{
                                                            backgroundColor: `${y.value}`
                                                        }}
                                                        onClick={() => this.handleSetSelected(indexX,y.displayValue,index)}
                                                    />
                                                )
                                                return(
                                                    <span 
                                                        key={`attrSel-${index}-${indexX}`}
                                                        onClick={() => this.handleSetSelected(indexX,y.value,index)}
                                                        className={`${this.state.optionSelected[indexX].indexItem === index && styles.textSelected}`}
                                                    >
                                                        {y.value}
                                                    </span>  
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={styles.descPrice}>
                                <span>Price:</span>
                                <span>{price.currency.symbol}{price.amount}</span>
                            </div> 
                            <div 
                                className={styles.addBtn}
                                onClick={() => this.handleAddToCart(product)}
                            >
                                ADD TO CART
                            </div>
                            <div className={styles.desc}>
                                {`${description}`}
                            </div>
                        </div>
                    </div>
                )}}
            </Query>
        );
    }
}

const mapDispatchToProps = dispatch => { 
    return{
        cart: (arr) => dispatch(addItem(arr))
    }
};

const mapStateToProps = state => {
    return{
        activeCurrency: state.activeStuff.currency
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(FrameProduct);