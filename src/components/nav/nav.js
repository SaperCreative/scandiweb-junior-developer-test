import React from "react";
import styles from './nav.module.scss';
import logosvg from '../../resources/images/logo.svg';
import cart from '../../resources/images/cart.svg';
import vector from '../../resources/images/vector.svg';
import NavLinks from "./navLinks";
import Currency from "../currency/currency";
import { client } from "../../index";
import { GET_CURRENCY } from "../../utils/queries";
import { connect } from "react-redux";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCurrencies: [{}],
            currency: '$',
            open: false,
            cartCount:1,
        };
    }

    componentDidMount() {
		client
			.query({
				query: GET_CURRENCY
			})
			.then((result) => {
				this.setState({
                    allCurrencies: result.data.currencies,
                    currency: result.data.currencies[this.props.activeCurrency].symbol
                });
			});
	}

    handleOpenCurrency(){
        this.setState({ 
            open: this.state.open?false:true 
        });
    }

    render() {
        return (
            <div className={styles.box}>
                <div className={styles.nav}>
                    <ul>
                        <NavLinks/>
                    </ul>
                </div>
                <div className={styles.logo}>
                    <img src={logosvg} alt='logo'/>
                </div>
                <div className={styles.action}>
                        <div 
                            className={styles.currency}
                            onClick={() => this.handleOpenCurrency()}
                        >
                            {this.state.allCurrencies.length>1 ?
                            this.state.allCurrencies[this.props.activeCurrency].symbol :
                            this.state.currency}
                            <img src={vector} alt='vector'/>
                            <ul className={this.state.open  ? '' : styles.currClose}>
                                <Currency/>
                            </ul>
                        </div>
                        <div 
                            className={styles.actionCart}
                            onClick={() => this.props.cartOpen()}
                        >
                            <img src={cart} alt='cart'/>
                            <div className={
                                this.props.cart.length>0 ?
                                styles.cartCount :
                                styles.hide
                            }>
                                {this.props.cart.length}
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        activeCurrency: state.activeStuff.currency,
        cart: state.cart
    }
};

export default connect(
    mapStateToProps
    )(Nav);