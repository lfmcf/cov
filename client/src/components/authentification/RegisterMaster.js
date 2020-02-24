import React, { Component } from 'react';
import RegisterStep1 from './registerStep1';
import RegisterStep2 from './registerStep2';

class RegisterMaster extends Component{
   
    state = {
        curentStep: 1,
        user: {},
    }

    changestep = (user) => {
        this.setState({
            curentStep: 2,
            user: user
        })
    }

    changestep2 = async (user) => {
        let userinfos = this.state.user
        this.setState({
            curentStep: 2,
            user: Object.assign(userinfos, user)
        })
        return this.state.user
    }

    render(){

        const { curentStep } = this.state
        let renderComp = null
        if(curentStep === 1){
            renderComp = <RegisterStep1  changestep={this.changestep} />
        }else {
            renderComp = <RegisterStep2 changestep={this.changestep2}/>
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        {renderComp}
                    </div>
                </div>
            </div>
        )
        
    }
}

export default RegisterMaster;