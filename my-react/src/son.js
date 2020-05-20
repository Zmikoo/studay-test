import React from 'react';
import {Consumer} from './官方示例';
import Groundson from './grandson';
function Son(props){
    return (
        <Consumer>
            {(name) => 
                <div style={{ border: '1px solid blue', width: '60%', margin: '20px auto', textAlign: 'center' }}>
                    <p>子组件。获取父组件的值： {name}</p>
                    <Groundson/>
                </div>
            }
        </Consumer>
    )
}

export default Son;