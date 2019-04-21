import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import WithoutRootDiv from '../../../hoc/WithoutRootDiv/WithoutRootDiv';
import './Modal.css';


class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        if(nextProps.show !== this.props.show || nextProps.children !== this.props.children){
            return true;
        }
        return false ;
    }

    componentWillUpdate () {
        console.log('CWILLUP Modal');
    }

    render () {
        console.log('in render modal');
        return (
            <WithoutRootDiv>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className='modal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-200vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </WithoutRootDiv>
        )
    }
}

export default Modal;