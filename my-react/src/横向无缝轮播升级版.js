import React from 'react';
import ReactDOM,{render} from 'react-dom';
import './index.css';
let items = [require('./imgs/1.jpg'),require('./imgs/2.jpg'),require('./imgs/3.jpg')];
class SliderList extends React.Component{
    render(){
        let style = {
            width:(this.props.items.length + 1) * 400 + 'px',
            left:-(this.props.index - 1)*400 +'px',
            transition: `left ${this.props.speed}s linear`
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
    go = (step) => {
        let index = this.state.index + step;
        if (index > this.props.items.length + 1){
            this.$ul.style.transitionDuration = '';
            this.$ul.style.left = '0px';
            setTimeout(() => {
                this.$ul.style.transitionDuration = this.props.speed + 's';
                index = 1;
                this.setState({index});
            },2000)
            return
        }
        this.setState({
            index:index
        })
    }
    turn = () => {
        this.timer = setInterval(() => {
            this.go(1)
        },this.props.delay * 1000);
    }

    componentDidMount(){
        if (this.props.autoplay) {
            this.turn();
        }
    }
    render(){
        return (
            <div className = 'slider-container' 
                 onMouseEnter={()=>{clearInterval(this.timer)}} 
                 onMouseLeave={()=>{this.turn()}}
                 >
                <SliderList ref='list' index={this.state.index} items={this.props.items} speed={this.props.speed} />
                
            </div>
        )
    }
}




ReactDOM.render(
    <Slider delay={1} speed={0.5} autoplay={true} items={items}/>,
    document.getElementById('root')
)