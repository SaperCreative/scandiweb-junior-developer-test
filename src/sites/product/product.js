import React from 'react';
import  styles  from './product.module.scss'
import Nav from '../../components/nav/nav';
import FrameProduct from '../../components/frameProduct/frameProduct';
import MiniCart from '../../components/miniCart/miniCart';
import { useParams } from 'react-router-dom';

class Product extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          id: '',
          cart:false
        };
    }

    componentDidMount() {
        this.setState({
            id: this.props.params.id    
        });
    }

    handleOpenCart = () =>{
        this.setState({ 
            cart: this.state.cart?false:true 
        });
    }

    render(){
        return(
            <div className={styles.container}>
                {this.state.cart&&<div className={styles.blackOut}/>}
                <Nav
                    cartOpen={this.handleOpenCart}
                />
                <div className={styles.title}>
                    <FrameProduct 
                        id={this.props.params.id}
                    />
                </div>
                {this.state.cart&&<MiniCart/>}
            </div>
        );
    }
}

const withRouter = Product => props => {
    const params = useParams();
    return (
      <Product
        {...props}
        params={params}
      />
    );
  };

export default withRouter(Product);