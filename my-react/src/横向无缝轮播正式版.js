import React from 'react';
import ReactDOM,{render} from 'react-dom';
import './index.css';
// ul,li{
//     list-style: none;
//     padding:0px;
//     margin:0px;
//   }
//   .slider-container{
//     width: 400px;
//     height: 300px;
//     border:5px solid red;
//     margin:0 auto;
//     position: relative;
//     overflow: hidden;
//   }
//   .slider-container ul{
//     position: relative;
//     height: 300px;
//     left:0;
//     top:0;
//   }
//   .slider-container li{
//     width: 400px;
//     height: 300px;
//     float: left;
//   }
//   .slider-container li img{
//     width: 100%;
//     height: 100%;
//   }
//   .slider-arrows{
//     position: absolute;
//     width: 100%;
//     height:40px;
//     top:50%;
//     transform: translateY(-50%);
//     left:0;
//   }
//   .slider-arrows span{
//       width: 30px;height: 40px;line-height: 40px;display: block;
//       background: #ffffff;text-align: center;-webkit-user-select: none;
//       cursor: pointer;
//   }
//   .slider-arrows span:nth-child(1){
//     float: left;
//   }
//   .slider-arrows span:nth-child(2){
//     float: right;
//   }
//   .slider-dots{
//     position: absolute;width: 100%;left: 0;bottom: 20px;text-align: center;
//   }
//   .slider-dots span{
//     background: #ffffff;display: inline-block;width: 20px;height: 20px;
//       border-radius: 50%;margin: 3px;cursor: pointer;
//   }
//   .slider-dots span.active{
//     background: rgba(233,222,100,0.8);
//   }
let items = [require('./imgs/1.jpg'),require('./imgs/2.jpg'),require('./imgs/3.jpg')];
class SliderList extends React.Component{
    render(){
        let style = {
            width:(this.props.items.length + 1) * 400 + 'px',
            left:-(this.props.index - 1)*400 +'px',
            transition: `left 0.5s linear`
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
                this.$ul.style.left = '0px';
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