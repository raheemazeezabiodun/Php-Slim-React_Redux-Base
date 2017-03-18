import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActionCreators from '../../actions/read';


class AppReadView extends Component {

    componentWillMount() {
        this.props.actions.readAction();
    }

    render() {
        return (
            <div>
                {this.props.statusText !== 'Read successfully.' ? <p>Loading data....</p> : 
                    <table className="table table-bordered table-hover">
                    <tbody>
                    <tr className="alert-info">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Others</th>
                    </tr>
                    
                    {this.props.datas.map((data) => {
                        return (<tr key={data.id}>
                            <td>{data.first_name}</td>
                            <td>{data.last_name}</td>
                            <td>{data.age}</td>
                            <td>{data.others}</td>                            
                        </tr>);
                    })}
                    </tbody>
                </table>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        datas: state.appReducer.data,
        isFetching: state.appReducer.isFetching,
        statusText: state.appReducer.statusText
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appActionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppReadView);