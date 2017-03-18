import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router'
import * as simTypeActionCreators from '../../../actions/setup/sim_type';


class SimTypeReadView extends Component {

    componentWillMount() {
        this.props.actions.readAction();
    }

    handleEdit(id){
        console.log(id);
    }

    handleDelete(id) {
        let payload = {
            id: id
        }
        this.props.actions.deleteAction(payload);
    }

    render() {
        return (
            <div>
                {this.props.statusText !== 'Sim Type Read successfully.' ? <p>Loading data....</p> : 
                    <table className="table table-bordered table-hover">
                    <tbody>
                    <tr className="alert-info">
                        <th>Code</th>
                        <th>Sim Type</th>
                        <th>Network</th>
                        <th>Others</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    
                    {this.props.data.map((sim) => {
                        const url = `/sim-type/edit/${sim.id}`;
                        return (<tr key={sim.id}>
                            <td>{sim.code}</td>
                            <td>{sim.type}</td>
                            <td>{sim.network}</td>
                            <td>{sim.others}</td>                            <td>
                                <Link to={url}>
                                    <button onClick={this.handleEdit} className="btn btn-info">Edit</button>
                                </Link>
                            </td>
                                
                            <td><button onClick={() => this.handleDelete(sim.id)} className="btn btn-danger">Delete</button></td>
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
        data: state.simType.data,
        isFetching: state.simType.isFetching,
        statusText: state.simType.statusText
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(simTypeActionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimTypeReadView);