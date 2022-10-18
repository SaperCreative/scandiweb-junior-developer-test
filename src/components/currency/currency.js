import React from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CURRENCY } from "../../utils/queries";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/activeStuff";

class Currency extends React.Component {
    render() {
        return (
            <Query 
                key={"key"} 
                query={GET_CURRENCY}
            >
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    if (data.currencies === undefined) return null;

                    return data.currencies.map((item, index) => (
                        <li
                            key={`currency-${index}`}
                            onClick={() => this.props.setCurrency(index)}
                        >
                            {`${item.symbol} ${item.label}`}
                        </li>
                    ));
                }}
            </Query>
        );
    }
}

const mapDispatchToProps = dispatch => { 
    return{
        setCurrency: (arr) => dispatch(setCurrency(arr))
    }
};

export default connect(
    null,
    mapDispatchToProps
    )(Currency);
