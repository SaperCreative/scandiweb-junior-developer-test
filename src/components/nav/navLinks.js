import React from "react";
import styles from './nav.module.scss';
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORY_NAMES } from "../../utils/queries";
import wrapNavigate from '../../utils/wrapNavigate'
import { connect } from "react-redux";
import { setCategory } from "../../redux/activeStuff";

class NavLinks extends React.Component {
    handleToCategory = (index) => {
        this.props.navigation(`/`);
        this.props.setCategory(index)
    }

    render() {
        return (
            <Query 
            key={"key"} 
            query={GET_CATEGORY_NAMES}
            >
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    if (data.categories === undefined) return null;

                    return data.categories.map((item, index) => (
                         <li
                        key={`navLink-${index}`}
                        onClick={() => this.handleToCategory(index)}
                        className={`${this.props.activeCategory === index && styles.active}`}
                          >
                            {item.name}
                        </li>
                    ));
                }}
            </Query>
        );
    }
}
const mapStateToProps = state => {
    return{
        activeCategory: state.activeStuff.category,
    }
};
const mapDispatchToProps = dispatch => { 
    return{
        setCategory: (id) => dispatch(setCategory(id))
    }
};

export default  wrapNavigate(
                connect(
                    mapStateToProps,
                    mapDispatchToProps
                    )(NavLinks));