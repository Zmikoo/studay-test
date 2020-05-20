import React from 'react';
import ReactDOM,{render} from 'react-dom';
import './index.css';
let items = [require('./imgs/1.jpg'),require('./imgs/2.jpg'),require('./imgs/3.jpg')];
class SliderList extends React.Component{
    render(){
        let style = {
            height:(this.props.items.length + 1) * 300 + 'px',
            top:-(this.props.index - 1)*300 +'px',
            transition: `top 0.5s linear`
        }
        return (
            <ul style={style} ref='ul'>                             
                {this.props.items.map((item,index) => (
                    <li key={index}><img src={item}/></li>
                ))}
                <li><img src={this.props.items[0]}/></li>
            </ul>
        )
    }
}

class Slider extends React.Component{
    constructor(){
        super();
        this.state = {
            index:1
        }
    }

    componentDidMount(){ 
        setInterval(() => {
            let index = this.state.index + 1;
            if (index > this.props.items.length + 1){              
                this.$ul.style.transitionDuration = '';
                this.$ul.style.top = '0px';
                console.log('当转到结尾'+ "('上一次输出left位置')时，停止ul的过渡效果transitionDuration，" +'并将ul的left值变成0')
                setTimeout(() => {
                    console.log('延时2s后开启ul的过渡效果,从0过渡到',-(1 - 1) * 400)
                    this.$ul.style.transitionDuration = '0.5s';
                    index = 1;
                    this.setState({index});
                },30)
                return
            }
            console.log('正常轮播情况下下一个图ul的left值：',-(index - 1)*400)
            this.setState({
                index:index
            })
        },1000);
        console.log(this.$ul = this.refs.list.refs.ul);
    }
    render(){
        return (
            <div className = 'slider-container'>
                <SliderList ref='list' index={this.state.index} items={this.props.items}  />          
            </div>
        )
    }
}
ReactDOM.render(
    <Slider items={items}/>,
    document.getElementById('root')
)