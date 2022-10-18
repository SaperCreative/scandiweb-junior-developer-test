import React from 'react';
import styles  from './main.module.scss'
import Nav from '../../components/nav/nav';
import ItemFrame from '../../components/itemFrame/itemFrame';
import MiniCart from '../../components/miniCart/miniCart';

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          cart:false
        };
    }

    handleOpenCart = () =>{
        this.setState({ 
            cart: this.state.cart?false:true 
        });
    }

    render(){
        return(
            <div className={styles.container}>
                <Nav
                    cartOpen={this.handleOpenCart} 
                />
                <div className={styles.title}>
                    <span>{this.props.category}</span>
                </div>
                <ItemFrame
                    category={this.props.category} 
                />
                {this.state.cart&&<MiniCart/>}
            </div>
        )
    }
}
export default Main;