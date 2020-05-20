import React from 'react';
import {Consumer} from './官方示例';
function Groundson(props){
    return (
        <Consumer>
            {(name) => 
                <div style={{border:'1px solid green',width:'60%',margin:'50px auto',textAlign:'center'}}>
                    <p>孙组件。获取传下来的值： {name}</p>
                </div>
            }
        </Consumer>
    )
}
export default Groundson;