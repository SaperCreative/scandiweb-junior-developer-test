import React from 'react';
import styles  from './main.module.scss'
import Nav from '../../components/nav/nav';
import ItemFrame from '../../components/itemFrame/itemFrame';
import MiniCart from '../../components/miniCart/miniCart';
import { client } from "../../index";
import { GET_CATEGORY_NAMES } from "../../utils/queries";
import { connect } from 'react-redux';

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          cart:false,
          allCategories: [{}]
        };
    }

    componentDidMount(){
        client
			.query({
				query: GET_CATEGORY_NAMES
			})
			.then((result) => {
                console.log(result.data.categories)
				this.setState({
                    allCategories: result.data.categories,
                });
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
                <Nav
                    cartOpen={this.handleOpenCart} 
                />
                <div className={styles.title}>
                    <span>
                        {this.state.allCategories.length > 1 && 
                         this.state.allCategories[this.props.activeCategory].name}
                    </span>
                </div>
                <ItemFrame
                    category={this.props.category} 
                />
                {this.state.cart&&<MiniCart/>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        activeCategory: state.activeStuff.category,
    }
};


export default connect(
    mapStateToProps
    )(Main);