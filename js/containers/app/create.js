import React, { Component } from 'react';
import t from 'tcomb-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as createAppActions from '../../actions/create';

const Form = t.form.Form;

const makerForm = t.struct({
    first_name: t.String,
    last_name: t.String,
    age: t.Num,
    others: t.maybe(t.String)
});

const makerFormOptions = {
    error: <i>Form not filled completely</i>,
    auto: 'placeholders',
    help: <i>Create A  Demo Bio</i>,
};

class CreateView extends Component {

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        actions: React.PropTypes.shape({
            createAction: React.PropTypes.func.isRequired
        }).isRequired,

    }

    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                first_name: '',
                last_name: '',
                age: '',
                others: ''
            }
        }
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const value = this.refs.form.getValue();
        if (value) {
            const payload = {
                firstName: this.state.formValues.first_name,
                lastName: this.state.formValues.last_name,
                age: this.state.formValues.age,
                others: this.state.formValues.others
            }
            this.props.actions.createAction(payload);
        }
    }

    _handleFormChange = (value) => {
        this.setState({ formValues: value })
    }

    render() {
        if (this.props.statusText) {
            const statusTextClassNames = {
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('A server error') === 0,
                'alert-success': this.props.statusText.indexOf('A server error') !== 0
            };

            let statusText = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <form onSubmit={this._handleSubmit}>
                <Form ref='form'
                    type={makerForm}
                    options={makerFormOptions}
                    value={this.state.formValues}
                    onChange={this._handleFormChange}
                />
                <button disabled={this.props.isFetching}
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Submit
                </button>
            </form> 
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.createAppReducer.isFetching,
        statusText: state.readAppReducer.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(createAppActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);